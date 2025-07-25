using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Exception;
using System.Net;
using MyFoodApp.API.DTO;
using System.Linq;
using MyFoodApp.API.Infrastructure.Extension;

using MyFoodApp.API.Enum;


namespace MyFoodApp.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly IMapper _mapper;

        public ReservationController(IReservationService reservationService, IMapper mapper)
        {
            _mapper = mapper;
            _reservationService = reservationService;
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet]
        public IEnumerable<Reservation> GetReservations()
        {           
            return _mapper.Map<IEnumerable<Reservation>>(_reservationService.GetAll());
        }

        // GET api/<ReservationController>/1/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbydateandstatus/{statusId}/{reservationDate}")]  //reservationDate in yyyyMMdd format
        public IActionResult GetReservationsByDateAndStatusId(string statusId, string reservationDate)
        {
            IEnumerable<int> statusIds = statusId.Split(",", System.StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList();
            var reservations = _reservationService.GetReservationsByDateAndStatusId(statusIds, DateTime.ParseExact(reservationDate, "yyyyMMdd", null).ToUniversalTime());
            return Ok(_mapper.Map<IEnumerable<ReservationsByDateAndStatusDto>>(reservations));
        }

        // GET api/<ReservationController>/getbybranchid/1
        [Authorize(Roles = "Super Admin")]
        [HttpGet("getbybranchid/{branchId}")]
        public IActionResult GetReservationsByBranchId(int branchId)
        {
            var model = _reservationService.GetReservationsByBranchId(branchId);            
            return Ok(model);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByReservationId(long id)
        {
            var model = await _reservationService.Get(id);
            if (model == null)
            {
                throw new ApiException(HttpStatusCode.NotFound);
            }
            return Ok(model);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee, User")]
        [HttpPost]
        public ActionResult AddReservation([FromBody] Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                throw new ApiException(HttpStatusCode.BadRequest, ModelState.ToString());
            }
            reservation.RequestedDateTime = DateTime.Now;
            reservation.CurrentStatusId = (int)ReservationStatusEnum.ToConfirm;
            _reservationService.Add(_mapper.Map<Reservation>(reservation));

            return Ok();
        }


        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPut]
        public void UpdateReservation([FromBody] Reservation reservation)
        {
            _reservationService.Update(reservation);
        }

        [Authorize(Roles = "User")]
        [HttpPost("user")]
        public ActionResult AddUserReservation([FromBody] Reservation reservation) 
        {
            _reservationService.AddUserReservation(reservation);
            return Ok();
        }

        [Authorize(Roles = "User")]
        [HttpGet("user")]
        public IEnumerable<Reservation> GetUserReservations()
        {           
            return _reservationService.GetUserReservations();
        }


        [HttpDelete("{id}")]
        public void DeleteReservation(int id)
        {
           _reservationService.Delete(id);
        }

        // GET api/<ReservationController>
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPatch("{reservationId}/{newStatusCrypt}")]
        public ActionResult UpdateEncryptedReservationStatus(long reservationId, string newStatusCrypt)
        {
            _reservationService.UpdateStatus(reservationId, newStatusCrypt.DecodeFromBase32String<int>());
            return Ok();
        }
    }
}
