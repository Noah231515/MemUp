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
        private readonly DbSet<Course> courses;

        public CoursesService(MemUpDbContext memUpDbContext)
        {
            this.memUpDbContext = memUpDbContext;
            this.courses = memUpDbContext.Courses;
        }
        
        private UserCourse GetUserCourse(Guid userId, Guid courseId)
        {
            return memUpDbContext.UserCourse.SingleOrDefault(uc => uc.UserId == userId && uc.CourseId == courseId);
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
        public int SubscribeToCourse(ApplicationUser user, Guid courseId)
        {
            try
            {
                Course course = memUpDbContext.Courses.Find(courseId);
                UserCourse userCourse = GetUserCourse(new Guid(user.Id), courseId);
                if (userCourse == null)
                {
                    userCourse = new UserCourse()
                    {
                        Id = new Guid(),
                        UserId = new Guid(user.Id),
                        CourseId = course.Id
                    };
                    memUpDbContext.UserCourse.Add(userCourse);
                    memUpDbContext.SaveChanges();
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch
            {
                return -1;
            }
        }

        public int UnsubscribeFromCourse(ApplicationUser user, Guid courseId)
        {   
            try
            {
                UserCourse userCourse = GetUserCourse(new Guid(user.Id), courseId);
                if (userCourse != null)
                {
                    memUpDbContext.UserCourse.Remove(userCourse);
                    memUpDbContext.SaveChanges();
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch
            {
                return -1;
            }
            
        }
    }

    public interface ICoursesService
    {
        List<Course> GetSubscribedCoursesForUsers(ApplicationUser user);
        int SubscribeToCourse(ApplicationUser user, Guid courseId);
        int UnsubscribeFromCourse(ApplicationUser user, Guid courseId);
    }
}
