using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyFoodApp.API.Integrations;
using System.Net;
using Twilio.Rest.Api.V2010.Account;

namespace MyFoodApp.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        private readonly IUserSession _userSession;
        private readonly IOrderStatusHistoryRepository _orderStatusHistoryRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly ITwilioService _twilioService;

        internal IOrderExtraRepository _orderExtraRepository { get; }

        public OrderService(IOrderRepository orderRepository,
            IOrderItemRepository orderItemRepository,
            IOrderExtraRepository orderExtraRepository,
            IMapper mapper,
            IOrderStatusHistoryRepository orderStatusHistoryRepository,
            IUserSession userSession,
            ITwilioService twilioService)
        {
            _orderStatusHistoryRepository = orderStatusHistoryRepository;
            _orderItemRepository = orderItemRepository;
            _orderExtraRepository = orderExtraRepository;
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userSession = userSession;
            _twilioService = twilioService;
        }

        public void Add(OrderDto order)
        {
            var orderData = _mapper.Map<Order>(order);
            orderData.CreateOrderDateTime = DateTime.Now;
            orderData.OrderItems = _mapper.Map<ICollection<OrderItem>>(order.OrderDetail.Where(od => od.OrderItemId != 0));
            orderData.OrderExtras = _mapper.Map<ICollection<OrderExtra>>(order.OrderDetail.Where(od => od.ExtraId != 0));
            orderData.CurrentStatusId = 1;
            orderData.Event = new Event
            {
                StartDateTime = DateTime.Now,
                EndDateTime = DateTime.Now.AddHours(1),
                AppUserId = _userSession.GetUserId(),
                BranchId = _userSession.BranchId,
                TypeId = (int)EventTypeEnum.DeliveryOrder,
                DeliveryCost = 5,
                CurrentStatusId = (int)EventStatusEnum.Open
            };
            _orderRepository.Create(orderData);
        }

        public Order Add(Order order)
        {
            order.CreateOrderDateTime = DateTime.Now;
            order.CurrentStatusId = (int)OrderStatusEnum.ToBeConfirmed;
            _orderRepository.Create(order);
            _orderStatusHistoryRepository.Create(new OrderStatusHistory
            {
                OrderId = order.Id,
                AdminUserId = _userSession.GetUserId(),
                ChangeDateTime = DateTime.Now,
                StatusId = order.CurrentStatusId
            });
            return _orderRepository.GetByKey(order.Id);
        }
        public void Update(long id, OrderDto order) {

            var orderData = _mapper.Map<Order>(order);
            var oldOrder = _orderRepository.GetByKey(id);
            //oldOrder.CustomerId = orderData.CustomerId;
            //oldOrder.CustomerName = orderData.CustomerName;
            //oldOrder.Details = orderData.Details;
            CleanOrderItems(id);
            CleanOrderExtras(id);
            oldOrder.OrderExtras = _mapper.Map<ICollection<OrderExtra>>(order.OrderDetail.Where(od => od.ExtraId != 0));
            oldOrder.OrderItems = _mapper.Map<ICollection<OrderItem>>(order.OrderDetail.Where(od => od.OrderItemId != 0));
            _orderRepository.Update(oldOrder);
        }

        private void CleanOrderItems(long orderId)
        {
            var _orderItems = _orderItemRepository.GetAllByOrderId(orderId);
            foreach (var orderExtra in _orderItems)
            {
                _orderItemRepository.DeleteByKey(orderExtra.Id);
            }
        }

        private void CleanOrderExtras(long id)
        {
            var _orderExtras = _orderExtraRepository.GetAllByOrderId(id);
            foreach (var orderExtra in _orderExtras)
            {
                _orderExtraRepository.DeleteByKey(orderExtra.Id);
            }
        }

        public OrderDto Get(long id)
        {
            var orderFound = _orderRepository.GetByKey(id);
            return _mapper.Map<OrderDto>(orderFound);            
        }
        public IEnumerable<Order> GetAll()
        {
            return _orderRepository.GetAll().OrderBy(x => x.Id);
        }
        public void Delete(long id) => _orderRepository.DeleteByKey(id);

        public IEnumerable<Order> GetOrdersByEventId(long eventId)
        {
            return _orderRepository.GetOrdersByEventId(eventId);
        }

        public IEnumerable<Order> GetOrdersByBranchId(int branchId)
        {
            return _orderRepository.GetOrdersByBranchId(branchId);
        }

        public IEnumerable<Order> GetAllByEventId(long eventId, string statuses)
        {

            if (statuses != null)
            {
                return _orderRepository.GetAllByEventIdAndStatus(eventId, statuses.Split(',').Select(s => s.DecodeFromBase32String<int>()));
            }
            else
            {
                return _orderRepository.GetAllByEventId(eventId);
            }
        }

        public IEnumerable<Order> GetByDateAndStatus(IEnumerable<int> statusIds, DateTime orderDate, IEnumerable<int> eventTypeIds)
        {
            return _orderRepository.GetByDateAndStatus(statusIds, orderDate, eventTypeIds);
        }

        public Order UpdateStatus(long orderId, int status)
        {
            var order = _orderRepository.GetByKey(orderId);
            order.CurrentStatusId = status;
            _orderStatusHistoryRepository.Create(new OrderStatusHistory
            {
                OrderId = order.Id,
                AdminUserId = _userSession.GetUserId(),
                ChangeDateTime = DateTime.Now,
                StatusId = status
            });
            _orderRepository.Update(order);
            return order;
        }

        public async Task<MessageResource> SendLogisticRequestMessage(long id)
        {
            Order order = _orderRepository.GetByKey(id);

            string messageBody = BuildLogisticsRequestMessageBody(order);

            string messageToNumber = GetBranchSendToDeliveryPhoneNumber(order);

            ITwilioMessage message = new ITwilioMessage();
            message.MessageBody = messageBody;
            message.ToPhoneNumber = messageToNumber;

            return await _twilioService.SendWhatsapp(message);


        }


        private string GetBranchSendToDeliveryPhoneNumber(Order order)
        {
            return order.Event.Branch.BranchLogisticProviders
                .Where(b => b.IsBranchDefault)
                .First()
                .LogisticProvider
                .Whatsapp;
        }

        private string BuildLogisticsRequestMessageBody(Order order)
        {

            string infoIfPayingCash = "";

            if(order.Event.Transactions.First().PaymentTypeId == (int) PaymentTypeEnum.Cash) // BORRAR OR, LA SEGUNDA PARTE ES ÚNICAMENTE PARA TESTEO
            {
                infoIfPayingCash = "Monto a Pagar: $" + order.Event.TotalAmount.ToString() + '\n';
            }

            Coordinates originCoordinates = JsonConvert.DeserializeObject<Coordinates>(order.Event.Branch.Coordinates);

            string commaSeparatedOriginCoordinates = originCoordinates.latitude.ToString() + ',' + originCoordinates.longitude.ToString();

            string message = "Pedido #" + order.Id + '\n' +
                "Hora a recoger: " + order.ScheduledOrderReady.ToString() + '\n' +
                "_ORIGEN_\n" +
                order.Event.Branch.Name + '\n' +
                order.Event.Branch.Address + '\n' +
                "Tipo de Pago: " + order.Event.Transactions.First().PaymentType.Name + '\n' +
                infoIfPayingCash +
                "https://www.google.com/maps/search/?api=1&" + WebUtility.UrlEncode(commaSeparatedOriginCoordinates) + '\n' +
                "Usuario: " + order.Event.User.UserName + '\n' +
                "_DESTINO_\n" +
                order.Event.DestinationLocation.Address + '\n' +
                "https://www.google.com/maps/search/?api=1&" + WebUtility.UrlEncode(order.Event.DestinationLocation.Coordinates) + '\n' +
                "Teléfono usuario: " + order.Event.User.PhoneNumber + '\n' +
                "Notas: " + order.Notes +
                "Distancia: " + order.Event.DeliveryDistanceKm.ToString() + " km\n" +
                "Costo Delivery: " + order.Event.DeliveryCost;

            return message;
        }
    }
}
