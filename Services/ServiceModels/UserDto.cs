using System;
using System.Collections.Generic;
using MemUp.Models;

namespace MemUp.ServiceModels
{
    public class UserDto
    {   
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public IList<ApplicationUserRole> Roles { get; set; }
    }
}
