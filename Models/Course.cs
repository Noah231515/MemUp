using Microsoft.EntityFrameworkCore;

namespace MemUp.Models
{
    public class Course : BaseModel
    {
        public long Name { get; set; }
    }
}
