using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using MemUp.Services;

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
    }
}
