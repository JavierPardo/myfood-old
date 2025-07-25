using AutoMapper;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Exception;
using MyFoodApp.API.Migrations;
using MyFoodApp.API.Models;
using MyFoodApp.API.Processors;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using MyFoodApp.API.Infrastructure.Extension;

namespace MyFoodApp.API.Services
{
    public class EventService : IEventService
    {
        private readonly IUserNotificationRepository _userNotificationRepository;
        private readonly IMapper _mapper;
        private readonly ILogisticProviderRateRepository _logisticProviderRateRepository;
        private readonly IBranchRepository _branchRepository;
        private readonly IDistanceCoordinatesCalculator _distanceCoordinatesCalculator;
        private readonly ICouponRepository _couponRepository;
        private readonly IOrderExtraRepository _orderExtraRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly ILogger<EventService> _logger;
        private readonly IEventRepository _eventRepository;
        private readonly IUserSession _userSession;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IUserRepository _userRepository;

        public EventService(IEventRepository eventRepository,
            IUserSession userSession,
            ITransactionRepository transactionRepository,
            IBranchRepository branchRepository,
            IDistanceCoordinatesCalculator distanceCoordinatesCalculator,
            IOrderItemRepository orderItemRepository,
            IOrderExtraRepository orderExtraRepository,
            IMapper mapper,
            ILogisticProviderRateRepository logisticProviderRateRepository,
            ICouponRepository couponRepository,
            IUserNotificationRepository userNotificationRepository,
            IUserRepository userRepository,
            ILogger<EventService> logger)
        {
            _userNotificationRepository = userNotificationRepository;
            _mapper = mapper;
            _logisticProviderRateRepository = logisticProviderRateRepository;
            _branchRepository = branchRepository;
            _distanceCoordinatesCalculator = distanceCoordinatesCalculator;
            _couponRepository = couponRepository;
            _orderExtraRepository = orderExtraRepository;
            _orderItemRepository = orderItemRepository;
            _logger = logger;
            _eventRepository = eventRepository;
            _userSession = userSession;
            _transactionRepository = transactionRepository;
            _userRepository = userRepository;
        }

        public void Add(Event model)
        {
            model.BranchId = _userSession.BranchId;
            model.AppUserId = _userSession.GetUserId();
            model.CurrentStatusId = (int)EventStatusEnum.Open;
            model.EventType = null;
            _eventRepository.Create(model);            
        }
        public void Update(Event model)
        {
            model.Orders = null;
            model.Coupon = null;
            model.EventType = null;
            model.DestinationLocation = null;

            CalculateCost(model.Id);

            var eventData = _eventRepository.GetByKey(model.Id);
            model.DeliveryCost = eventData.DeliveryCost;
            model.DeliveryDistanceKm = eventData.DeliveryDistanceKm;
            model.CouponDiscountAmount = eventData.CouponDiscountAmount;
            
            _eventRepository.Update(model);
        }
        public Event Get(long id)
        {
            CalculateCost(id);
            Event eventData = _eventRepository.GetById(id);
            eventData.Orders.ForEach(x =>
            {
                x.Event = null;
                x.OrderItems.ForEach(oi =>
                {
                    oi.Order = null;
                    oi.Item.OrderItems = null;
                    oi.SelectedOptions.ForEach(so =>
                    {
                        so.OrderItem = null;
                        so.Option.OrderItemSelectedOptions = null;

                    });
                    oi.SelectedSides.ForEach(ss =>
                    {
                        ss.Side.OrderItemSelectedSides = null;
                        ss.OrderItem = null;
                    });
                });
                x.OrderExtras.ForEach(oi =>
                {
                    oi.Order = null;
                    oi.Side.OrderExtras = null;
                });
            });
            return eventData;
        }

        public Event GetDetailed(long id)
        {
            CalculateCost(id);
            var eventData = _eventRepository.GetCompleteById(id, true);
            return eventData;
        }

        public void CalculateCost(long eventId)
        {
            var @event = _eventRepository.GetCompleteById(eventId, false);
            var orderItems = _orderItemRepository.GetAllByEventIdAndOrderBillable(eventId);
            var orderExtras = _orderExtraRepository.GetAllByEventIdAndOrderBillable(eventId);
            decimal total = orderItems.Aggregate((decimal)0, (subTotal, current) =>
            {
                subTotal += (current.Price * current.Quantity);
                return subTotal;
             });
            total += orderExtras.Aggregate((decimal)0, (subTotal, current) =>
              {
                  subTotal += (current.Price*current.Quantity);
                  return subTotal;
              });
            var coupon = _couponRepository.GetByEventId(eventId);
            decimal discount = 0;
            if (coupon != null && coupon.MinAmount <= total)
            {
                if (coupon.DiscountType == (int)CouponDiscountTypeEnum.Amount)
                {
                    discount = coupon.Amount;
                }
                else
                {
                    discount = ((decimal)coupon.Amount * (decimal)@event.TotalAmount) / 100;
                }
            }
            var currentBranch = _branchRepository.GetByKey(_userSession.BranchId);
            decimal deliveryFee = 0;
            if (@event.DestinationLocation != null && @event.EventType.Deliverable && !string.IsNullOrWhiteSpace(currentBranch.Coordinates))
            {
                var actualDistance = _distanceCoordinatesCalculator.CalculateDistance(currentBranch.Coordinates, @event.DestinationLocation.Coordinates);
                var rate = _logisticProviderRateRepository.GetByDistance(actualDistance, _userSession.BranchId);
                deliveryFee = rate.Fee;
                @event.CouponDiscountAmount = actualDistance;
            }
            @event.TotalAmount = total;
            @event.DeliveryCost = deliveryFee;
            @event.CouponDiscountAmount = discount;
            @event.DestinationLocation = null;
            @event.EventType = null;
            @event.EventStatus = null;
            _eventRepository.Update(@event);
        }

        public IEnumerable<Event> GetAll()
        {
            var events=_eventRepository.GetAll().OrderBy(x => x.StartDateTime);
          
            return events.Select(e=>
            {
                e.AppUser.Events = null;
                e.User = _mapper.Map<AppUserModel>(e.AppUser);
                return e;
            });
        }
        public void Delete(long id) => _eventRepository.DeleteByKey(id);

        public IEnumerable<Event> GetEventsByDateAndStatusId(int statusId, DateTime eventDate, IEnumerable<int> eventTypeIds)
        {
            return _eventRepository.GetEventsByDateAndStatusId(statusId, eventDate, eventTypeIds);
        }

        public Event UpdateStatus(long eventId, int eventStatusId)
        {
            var eventData = _eventRepository.GetByKey(eventId);
            eventData.CurrentStatusId = eventStatusId;
            _eventRepository.Update(eventData);
            _userNotificationRepository.Create(new UserNotification
            {
                IsRead = false,
                Message="El estado fue cambiado satisfactoriamente",
                UserId=eventData.AppUserId,
                UserNotificationType=new UserNotificationType
                {
                    TypeName="ChangeStatus"                    
                }
            }) ;
            return eventData;
        }

        public IEnumerable<Event> GetEventsByUserId()
        {
            var userId = _userSession.GetUserId();
            return _eventRepository.GetEventsByUserId(userId);
        }
    }
}
