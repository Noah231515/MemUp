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
    public class UsersController : Controller
    {
        private readonly ILogger<UsersController> logger;
        private readonly UserManager<ApplicationUser> userManager;
        
        public UsersController(
            MemUpDbContext memUpDbContext,
            ILogger<UsersController> logger,
            UserManager<ApplicationUser> userManager
        )
        {
            this.logger = logger;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(userManager.Users);
        }
    }
}
