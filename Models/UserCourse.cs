using System;

namespace MemUp.Models
{
    public class UserCourse : BaseModel
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
    }
}
