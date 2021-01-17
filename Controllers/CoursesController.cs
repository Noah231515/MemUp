using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MemUp.Controllers
{
    // Reference Controller
    // Route at http//localhost:5000/Test/{MethodName}
    public class CoursesController : ControllerBase
    {
        private readonly ILogger<CoursesController> _logger;

        public CoursesController(ILogger<CoursesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetCoursesForUsers()
        {
            return Ok("test");
        }
    }
}
