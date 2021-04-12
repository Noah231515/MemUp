using System;
using System.Collections.Generic;
using MemUp.Models;

namespace MemUp.ServiceModels
{
    public class UserDto
    {   
        public string UserId { get; set; }
        public string UserName { get; set; }
        public IList<string> Roles { get; set; }
    }
}
