
using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MemUp.Services;

namespace MemUp.Controllers 
{
    public class UsersController : Controller
    {
        private readonly ILogger<UsersController> logger;
        private readonly IUsersService usersService;
        
        public UsersController(
            MemUpDbContext memUpDbContext,
            ILogger<UsersController> logger,
            IUsersService usersService
        )
        {
            this.logger = logger;
            this.usersService = usersService;
        }

        /// <summary>
        /// Retrevies all users
        /// </summary>
        /// <returns>List of UserDtos</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(usersService.GetAllUsers());
        }
    }
}
