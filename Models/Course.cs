using System.Collections.Generic;

namespace MemUp.Models
{
    public class Course : BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<CourseWord> CourseWords { get; set; }
    }
}
