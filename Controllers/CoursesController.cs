﻿using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace MemUp.Controllers
{
    // Reference Controller
    // Route at http//localhost:5000/Test/{MethodName}
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
            return Ok(user?.Courses?.ToList());
        }
    }
}