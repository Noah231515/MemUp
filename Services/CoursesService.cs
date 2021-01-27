using System.Threading.Tasks;
using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Collections.Generic;

namespace MemUp.Services
{
    public class CoursesService : ICoursesService
    {
        private readonly MemUpDbContext memUpDbContext;

        public CoursesService(MemUpDbContext memUpDbContext)
        {
            this.memUpDbContext = memUpDbContext;
        }
        
        public List<Course> GetSubscribedCoursesForUsers(ApplicationUser user)
        {
            List<Course> subscribedCourses = new List<Course>();
            if (user != null)
            {
                var userCourses = memUpDbContext.UserCourse.Where(uc => uc.UserId == new Guid(user.Id)).ToList();
                foreach (UserCourse userCourse in userCourses)
                {
                    Course course = memUpDbContext.Courses.Find(userCourse.CourseId);
                    subscribedCourses.Add(course);
                }
            }
            return subscribedCourses;
        }
    }

    public interface ICoursesService
    {
        List<Course> GetSubscribedCoursesForUsers(ApplicationUser user);
    }
}
