using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class UserPointsTransactionController : ControllerBase
    {
        private readonly IUserPointsTransactionService _userPointsTransactionService;
        private readonly IPointsExchangeService _pointsExchangeService;
        private readonly IUserSession _userSession;
        public UserPointsTransactionController(IUserPointsTransactionService userPointsTransactionService, IPointsExchangeService pointsExchangeService, IUserSession userSession)
        {
            _userSession = userSession;
            _userPointsTransactionService = userPointsTransactionService;
            _pointsExchangeService = pointsExchangeService;
        }

        // GET api/<UserPointsTransactionController>
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("{startDate?}/{endDate?}")]
        public IActionResult GetAllUserPointsTransactionsByDate(DateTime? startDate, DateTime? endDate)
        {
            var ret = _userPointsTransactionService.GetAllUserPointsTransactionsByDate(startDate, endDate);
            return Ok(ret);
        }

        // GET api/<UserPointsTransactionController>
        [Authorize(Roles = "Super Admin, Admin, User, Employee, Accounting")]
        [HttpGet("{userId}/{startDate?}/{endDate?}")]
        public IActionResult GetUserPointsTransactionByUserId(long userId, DateTime? startDate, DateTime? endDate)
        {
            var ret = _userPointsTransactionService.GetUserPointsTransactionByUserId(userId, startDate, endDate);
            if (_userSession.HasUserRol)
            {
                if (userId == _userSession.GetUserId())
                {
                    return Ok(ret);
                }
                else
                    return Unauthorized();
            }
            else
                return Ok(ret);
        }

        // GET api/<UserPointsTransactionController>
        [Authorize(Roles = "Super Admin, Admin, User, Employee, Accounting")]
        [HttpGet("getpointstotal/{userId}/{startDate?}/{endDate?}")]
        public IActionResult GetUserPointsTotalByUserId(long userId, DateTime? startDate, DateTime? endDate)
        {
            var ret = _userPointsTransactionService.GetUserPointsTotalByUserId(userId, startDate, endDate);
            if (_userSession.HasUserRol)
            {
                if (userId == _userSession.GetUserId())
                {
                    return Ok(ret);
                }
                else
                    return Unauthorized();
            }
            else
                return Ok(ret);
        }

        // GET api/<UserPointsTransactionController>
        [Authorize(Roles = "Super Admin, Admin, User, Employee, Accounting")]
        [HttpGet("pointsneeded/{userId}")]
        public IActionResult GetUserPointsNeededByUserId(long userId)
        {
            var pointsExchange = _pointsExchangeService.GetCurrentPointsExchange();
            var totalUser = _userPointsTransactionService.GetUserPointsTotalByUserId(userId, DateTime.Now.AddYears(-1), DateTime.Now);
            int pointsNeeded = pointsExchange.RequiredPoints - totalUser;
            if (_userSession.HasUserRol)
            {
                if (userId == _userSession.GetUserId())
                {
                    return Ok(pointsNeeded);
                }
                else
                    return Unauthorized();
            }
            else
                return Ok(pointsNeeded);
        }

        // GET api/<UserPointsTransactionController>/5
        [Authorize(Roles = "Super Admin, Admin, User, Employee, Accounting")]
        [HttpGet("{id}")]
        public IActionResult GetUserPointsTransactionById(int id)
        {
            var ret = _userPointsTransactionService.Get(id);
            if (_userSession.HasUserRol)
            {
                if (ret.UserId == _userSession.GetUserId())
                {
                    return Ok(ret);
                }
                else
                    return Unauthorized();
            }
            else
                return Ok(ret);
        }

        // POST api/<ImageCollectionController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddUserPointsTransaction([FromBody] UserPointsTransaction userPointsTx)
        {
            _userPointsTransactionService.Add(userPointsTx);
        }

        // PUT api/<ImageCollectionController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut("{id}")]
        public void UpdateUserPointsTransaction([FromBody] UserPointsTransaction userPointsTx)
        {
            _userPointsTransactionService.Update(userPointsTx);
        }


    }
}
