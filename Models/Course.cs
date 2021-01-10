using System.Collections.Generic;

namespace MemUp.Models
{
    public class Course : BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }

        /* Relationships Setup */
        public ICollection<CourseWord> CourseWords { get; set; }
        public ICollection<CourseUser> CourseUsers { get; set; }
    }
}
