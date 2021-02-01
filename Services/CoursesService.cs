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

        public List<Course> GetNewCoursesForUsers(ApplicationUser user)
        {            
            List<Course> newCourses = new List<Course>();
            if (user != null)
            {
                foreach (Course course in memUpDbContext.Courses)
                {
                    if (GetUserCourse(new Guid(user.Id), course.Id) == null)
                    {
                        newCourses.Add(memUpDbContext.Courses.Find(course.Id));
                    }
                }
            }
            return newCourses;
        }
        public UserCourse SubscribeToCourse(ApplicationUser user, Guid courseId)
        {
            try
            {
                UserCourse userCourse = new UserCourse()
                {
                    Id = new Guid(),
                    UserId = new Guid(user.Id),
                    CourseId = courseId
                };
                memUpDbContext.UserCourse.Add(userCourse);
                memUpDbContext.SaveChanges();
                return userCourse;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public UserCourse UnsubscribeFromCourse(ApplicationUser user, Guid courseId)
        {   
            try
            {
                UserCourse userCourse = GetUserCourse(new Guid(user.Id), courseId);
                if (userCourse != null)
                {
                    memUpDbContext.UserCourse.Remove(userCourse);
                    memUpDbContext.SaveChanges();
                    return userCourse;
                }
                return null;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }

    public interface ICoursesService
    {
        List<Course> GetSubscribedCoursesForUsers(ApplicationUser user);
        List<Course> GetNewCoursesForUsers(ApplicationUser user);
        UserCourse SubscribeToCourse(ApplicationUser user, Guid courseId);
        UserCourse UnsubscribeFromCourse(ApplicationUser user, Guid courseId);
    }
}
