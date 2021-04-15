using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace MemUp.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser(string userName) : base(userName)
        {
        }
        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}
