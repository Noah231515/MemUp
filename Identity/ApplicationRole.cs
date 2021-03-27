using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace MemUp.Models 
{
    public class ApplicationRole : IdentityRole
    {
        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}