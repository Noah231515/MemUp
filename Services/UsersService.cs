using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Collections.Generic;
using MemUp.ServiceModels;

namespace MemUp.Services
{
    public class UsersService : IUsersService
    {
        private readonly MemUpDbContext memUpDbContext;
        private readonly IQueryable<ApplicationUser> users;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly UserManager<ApplicationUser> userManager;

        public UsersService(
            MemUpDbContext memUpDbContext,
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager
        )
        {
            this.memUpDbContext = memUpDbContext;
            this.users =  userManager.Users.Include(x => x.UserRoles);
            this.roleManager = roleManager;
            this.userManager = userManager;
        }


        public IList<UserDto> GetAllUsers()
        {
            return users.Select(x => new UserDto() {
                UserId = x.Id,
                UserName = x.UserName,
                Roles = userManager.GetRolesAsync(x).GetAwaiter().GetResult()
            })
            .ToList();
        }
    }


    public interface IUsersService
    {
        /// <summary>
        /// Retrevies all users
        /// </summary>
        /// <returns>List of UserDtos</returns>
        IList<UserDto> GetAllUsers();
    }
}
