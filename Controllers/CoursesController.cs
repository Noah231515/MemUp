using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace MemUp.Controllers
{
    // Reference Controller
    // Route at http//localhost:5000/Test/{MethodName}
    public class CoursesController : Controller
    {
        private readonly ILogger<CoursesController> logger;
        private readonly MemUpDbContext memUpDbContext;

        public CoursesController(MemUpDbContext memUpDbContext, ILogger<CoursesController> logger)
        {
            this.logger = logger;
            this.memUpDbContext = memUpDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubscribedCoursesForUsers()
        {
            return Ok(await memUpDbContext.Courses.FirstOrDefaultAsync());
        }
    }
}
