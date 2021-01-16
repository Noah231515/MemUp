using System.Collections.Generic;

namespace MemUp.Models
{
    public class Course : BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }

        /* Relationships Setup */
        public ICollection<Word> Words { get; set; }
        public ICollection<ApplicationUser> Users { get; set; }
    }
}
