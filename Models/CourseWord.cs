using System;

namespace MemUp.Models
{
    public class CourseWord : BaseModel
    {
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
        public Guid WordId { get; set; }
        public Word Word { get; set; }
    }
}
