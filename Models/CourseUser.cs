using System;

namespace MemUp.Models
{
    public class CourseUser : BaseModel
    {
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
