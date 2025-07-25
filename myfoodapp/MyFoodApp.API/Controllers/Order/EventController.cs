using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Services;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Integrations;
using AutoMapper;
using Newtonsoft.Json;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Infrastructure.Exception;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly ILocationService _locationService;
        private readonly ITransactionService _transactionService;
        private readonly IReservationService _reservationService;
        private readonly ITodoTixService _todoTixService;
        private readonly ILogisticProviderRepository _logisticProviderRepository;
        private readonly IMapper _mapper;


        public EventController(IEventService eventService,
            ILocationService locationService,
            ITransactionService transactionService,
            IReservationService reservationService,
            ITodoTixService todoTixService,
            ILogisticProviderRepository logisticProviderRepository,
            IMapper mapper)

        {
            _mapper = mapper;
            _eventService = eventService;
            _locationService = locationService;
            _transactionService = transactionService;
            _reservationService = reservationService;
            _todoTixService = todoTixService;
            _logisticProviderRepository = logisticProviderRepository;

        }

        // GET api/<EventController>
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet]
        public IActionResult GetEventsByBranchId()
        {
            return Ok(_eventService.GetAll());
        }

        // GET api/<EventController>/1/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbydateandstatus/{statusId}/{eventDate}/{eventTypeId}")]  //eventDate in yyyyMMdd format
        public IActionResult GetEventsByDateAndStatusId(int statusId, string eventDate, string eventTypeId)
        {
            IEnumerable<int> eventTypeIds = eventTypeId.Split(",", System.StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList();
            var events = _eventService.GetEventsByDateAndStatusId(statusId, DateTime.ParseExact(eventDate, "yyyyMMdd", null).ToUniversalTime(), eventTypeIds);
            return Ok(_mapper.Map<IEnumerable<EventsByDateAndStatusDto>>(events));
        }

        // GET api/<EventController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting, User")]
        [HttpGet("{id}")]
        public Event GetByEventId(long id)
        {
            return _eventService.Get(id);
        }

        // GET api/<EventController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting, User")]
        [HttpGet("getdetailed/{id}")]
        public IActionResult GetDetailedByEventId(long id)
        {
            var events = _eventService.GetDetailed(id);
            return Ok(_mapper.Map<EventsGetDetailByIdDto>(events));
        }

        // GET api/<EventController>/5
        [Authorize(Roles = "User")]
        [HttpGet("User")]
        public IActionResult GetEventsByCurrentUserId()
        {
            return Ok(_eventService.GetEventsByUserId());
        }

        // GET api/<EventController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPatch("{eventId}/{cryptedStatusId}")]
        public Event UpdateEncryptedEventStatus(long eventId, string cryptedStatusId)
        {
            return _eventService.UpdateStatus(Convert.ToInt64(eventId), cryptedStatusId.DecodeFromBase32String<int>());
        }

        // POST api/<EventController>
        [Authorize(Roles = "Super Admin, Admin, Employee, User")]
        [HttpPost]
        public string AddEvent([FromBody] Event model)
        {
            var location = model.DestinationLocation;
            //se crea location si es necesario y agrega al evento. el evento se cera antes de agregar cualquier transaction.
            if (model.TypeId == (int)EventTypeEnum.DeliveryOrder)
            {//pedido delivery
                var lp = _logisticProviderRepository.GetByBranchIdDefault(model.BranchId);
                model.LogisticsProviderId = lp.Id;
                if (location != null)
                {//crear location
                    _locationService.Add(location);
                    model.DestinationLocationId = location.Id;
                }
            }
            
            _eventService.Add(model);

            return model.Id.ToString();
        }

        // POST api/<EventController>
        [HttpPost("createdebt")]

        public IActionResult CreateDebtAsync(RegisterDebtDTO debtDTO)
        {
            Task<string> resp = _todoTixService.CreateDebtAsyncByEventId(debtDTO);
            if(string.IsNullOrEmpty(resp.Result))
            {
                throw new ApiException(System.Net.HttpStatusCode.NotFound);
            }
            return Ok(debtDTO);
        }


        // POST api/<EventController>
        [HttpPost("refreshpayment/{eventId}")]

        public void RefreshEventPaymentAsync(long eventId)
        {

            _todoTixService.UpdatePaymentEvent(eventId);

        }

        // PUT api/<EventController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPut]
        public long UpdateEvent([FromBody] Event model)
        {
            var location = model.DestinationLocation;
            _eventService.Update(model);
            if (model.DestinationLocationId.HasValue)
            {
                location.Id = model.DestinationLocationId.Value;
                _locationService.Update(location);
            }
            return model.Id;
        }

        // GET api/<EventController>
        [Authorize(Roles = "User")]
        [HttpGet("getEventsByUser")]
        public IEnumerable<Event> GetEventsByUserId()
        {
            return _eventService.GetEventsByUserId();
        }

        // GET api/<EventController>
        //// DELETE api/<EventController>/5
        //[HttpDelete("{id}")]
        //public void DeleteEvent(long id)
        //{
        //    _modelService.Delete(id);
        //}
    }
}
