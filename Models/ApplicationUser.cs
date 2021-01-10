using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemUp.Models
{
    public class ApplicationUser : IdentityUser
    {  
         /* Relationships Setup */
         public ICollection<CourseUser> CourseUsers { get; set; }
    }
}
