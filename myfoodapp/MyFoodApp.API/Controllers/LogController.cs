using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {
        private readonly ILogService _logService;

        public LogController(ILogService logService)
        {
            _logService = logService;
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet]
        public IActionResult GetLogFile([FromQuery] string path="")
        {
            (bool isFile, object content) = _logService.GetPath(path);

            return Ok(content);
        }
    }
}
