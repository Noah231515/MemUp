using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Collections.Generic;

namespace MemUp.Controllers
{
    public class CoursesController : Controller
    {
        private readonly ILogger<CoursesController> logger;
        private readonly MemUpDbContext memUpDbContext;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly DbSet<Course> courses;
        

        public CoursesController(MemUpDbContext memUpDbContext, ILogger<CoursesController> logger, UserManager<ApplicationUser> userManager)
        {
            this.logger = logger;
            this.memUpDbContext = memUpDbContext;
            this.userManager = userManager;
            this.courses = this.memUpDbContext.Courses;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubscribedCoursesForUsers()
        {
            var user = await userManager.GetUserAsync(this.User);
            List<Course> subscribedCourses = new List<Course>();
            if (user != null)
            {
                var userCourses = memUpDbContext.UserCourse.Where(uc => uc.UserId == new Guid(user.Id)).ToList();
                foreach (UserCourse userCourse in userCourses)
                {
                    Course course = memUpDbContext.Courses.Find(userCourse.CourseId);
                    subscribedCourses.Add(course);
                }
            }
            return Ok(subscribedCourses);
        }
    }
}
