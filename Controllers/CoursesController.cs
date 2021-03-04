using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using MemUp.Services;
using System;

namespace MemUp.Controllers
{
    public class CoursesController : Controller
    {
        private readonly ILogger<CoursesController> logger;
        private readonly UserManager<ApplicationUser> userManager;
        private ICoursesService coursesService;
        

        public CoursesController(MemUpDbContext memUpDbContext, ILogger<CoursesController> logger, UserManager<ApplicationUser> userManager, ICoursesService coursesService)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.coursesService = coursesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubscribedCoursesForUsers()
        {
            var user = await userManager.GetUserAsync(this.User);
            return Ok(coursesService.GetSubscribedCoursesForUsers(user));
        }

        [HttpGet]
        public IActionResult GetCourse(Guid id)
        {
            return Ok(coursesService.GetCourse(id));
        }

        [HttpGet]
        public IActionResult GetAllCourses()
        {
            return Ok(coursesService.GetAllCourses());
        }
        
        public async Task<IActionResult> GetNewCoursesForUsers()
        {
            var user = await userManager.GetUserAsync(this.User);
            return Ok(coursesService.GetNewCoursesForUsers(user));
        }

        [HttpPost]
        [Route("/courses/subscribetocourse/{courseId}")]
        public async Task<IActionResult> SubscribeToCourse(Guid courseId)
        {
            var user = await userManager.GetUserAsync(this.User);
            return Ok(coursesService.SubscribeToCourse(user, courseId));
        }

        [HttpDelete]
        [Route("/courses/unsubscribefromcourse/{courseId}")]
        public async Task<IActionResult> UnsubscribeFromCourse(Guid courseId)
        {
            var user = await userManager.GetUserAsync(this.User);
            return Ok(coursesService.UnsubscribeFromCourse(user, courseId));  
        } 

        [HttpGet]
        [Route("/courses/getnumberofusers/{courseId}")]
        public IActionResult GetNumberOfUsers(Guid courseId)
        {
            return Ok(coursesService.GetNumberOfUsers(courseId));
        }
    }
}
