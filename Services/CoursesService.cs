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
                    course.Words = course.Words.OrderBy(w => w.DifficultyIndex).ToList();
                    subscribedCourses.Add(course);
                }
            }
            return subscribedCourses;
        }

        public Course GetCourse(Guid id)
        {
            Course course = memUpDbContext.Courses
                .Include(c => c.Words)
                .ThenInclude(w => w.Sentences)
                .ThenInclude(s => s.SentenceType)
                .SingleOrDefault(c => c.Id == id);
            
            course.Words = course.Words.OrderBy(w => w.DifficultyIndex).ToList();
            return course;
        }

        public Course UpdateCourse(Course updatedCourse) 
        {
            Course courseInDb = memUpDbContext.Courses
                .Include(c => c.Words)
                .ThenInclude(w => w.Sentences)
                .ThenInclude(s => s.SentenceType)
                .SingleOrDefault(c => c.Id == updatedCourse.Id);
            memUpDbContext.Entry(courseInDb).CurrentValues.SetValues(updatedCourse);
            memUpDbContext.SaveChanges();
            return courseInDb;
        }

        public List<Course> GetAllCourses()
        {
            return memUpDbContext.Courses
                .Include(c => c.Words)
                .ThenInclude(w => w.Sentences)
                .ThenInclude(s => s.SentenceType)
                .ToList();
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

                newCourses = memUpDbContext.Courses
                .Include(x => x.Words)
                .ThenInclude(x => x.Sentences)
                .ThenInclude(x => x.SentenceType)
                .Where(x => !subscribedCourses.Contains(x.Id))
                .ToList(); 
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

        public int GetNumberOfUsers(Guid courseId)
        {
            return memUpDbContext.UserCourse.Where(x => x.CourseId == courseId).Count();
        }

        
    }

    public interface ICoursesService
    {
        List<Course> GetSubscribedCoursesForUsers(ApplicationUser user);
        Course GetCourse(Guid id);
        Course UpdateCourse(Course course);
        List<Course> GetAllCourses();
        List<Course> GetNewCoursesForUsers(ApplicationUser user);
        UserCourse SubscribeToCourse(ApplicationUser user, Guid courseId);
        UserCourse UnsubscribeFromCourse(ApplicationUser user, Guid courseId);
        int GetNumberOfUsers(Guid courseId);
    }
}
