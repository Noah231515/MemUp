using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MemUp.Models
{
    public abstract class BaseModel
    {
        public Guid Id { get; set; }
    }
}
