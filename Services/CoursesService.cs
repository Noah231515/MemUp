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
                    Course course = memUpDbContext.Courses
                        .Include(c => c.Words)
                        .ThenInclude(w => w.Sentences)
                        .ThenInclude(s => s.SentenceType)
                        .SingleOrDefault(c => c.Id == userCourse.CourseId);
                    subscribedCourses.Add(course);
                }
            }
            return subscribedCourses;
        }

        public Course GetCourse(Guid id)
        {
            return memUpDbContext.Courses
                .Include(Course => Course.Words)
                .ThenInclude(Word => Word.Sentences)
                .ThenInclude(s => s.SentenceType)
                .SingleOrDefault(x => x.Id == id);
        }
        
        public List<Course> GetNewCoursesForUsers(ApplicationUser user)
        {            
            List<Course> newCourses = new List<Course>();
            if (user != null)
            {
                 var subscribedCourses = memUpDbContext.UserCourse
                    .Where(x => x.UserId == new Guid(user.Id))
                    .Select(x => x.CourseId)
                    .Distinct()
                    .ToList();

                newCourses = memUpDbContext.Courses.Where(x => !subscribedCourses.Contains(x.Id)).ToList(); 
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
        Course GetCourse(Guid id);
        List<Course> GetNewCoursesForUsers(ApplicationUser user);
        UserCourse SubscribeToCourse(ApplicationUser user, Guid courseId);
        UserCourse UnsubscribeFromCourse(ApplicationUser user, Guid courseId);
    }
}
