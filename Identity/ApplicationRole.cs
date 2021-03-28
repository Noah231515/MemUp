using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace MemUp.Models 
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole(string name) : base(name)
        {
        }

        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}