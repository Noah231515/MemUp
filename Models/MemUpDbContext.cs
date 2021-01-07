
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MemUp.Models
{
    public class MemUpDbContext : DbContext
    {
        public MemUpDbContext(DbContextOptions<MemUpDbContext> options)
            : base(options)
        {
        }

        public MemUpDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            // Course DB Model Builder
            modelBuilder.Entity<Course>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Course>()
                .HasIndex(x => x.Id)
                .IsUnique();

            modelBuilder.Entity<Course>()
                .Property(x => x.Name).HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(x => x.Description).HasMaxLength(100);

            // Word DB Model Builder
            modelBuilder.Entity<Word>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Word>()
                .Property(x => x.JapaneseVocab).HasMaxLength(20);
            
            modelBuilder.Entity<Word>()
                .Property(x => x.KanaVocab).HasMaxLength(20);
            
            modelBuilder.Entity<Word>()
                .Property(x => x.EnglishVocab).HasMaxLength(20);
            
            modelBuilder.Entity<Word>()
                .Property(x => x.PartOfSpeech).HasMaxLength(20);
            
            // CourseWord DB Model Builder
            modelBuilder.Entity<CourseWord>()
                .HasKey(cw => new { cw.CourseId, cw.WordId });

            modelBuilder.Entity<CourseWord>()
                .HasOne(cw => cw.Course)
                .WithMany(c => c.CourseWords)
                .HasForeignKey(cw => cw.CourseId);

            modelBuilder.Entity<CourseWord>()
                .HasOne(cw => cw.Word)
                .WithMany(w => w.CourseWords)
                .HasForeignKey(cw => cw.WordId);
            
                
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Data Source=MemUp.db");
            }
        }

        public DbSet<Course> Courses { get; set;}
    }
}