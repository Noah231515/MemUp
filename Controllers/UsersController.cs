using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using MemUp.Services;
using System;
using System.Collections.Generic;
using System.Linq;

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

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(usersService.GetAllUsers());
        }
    }
}
