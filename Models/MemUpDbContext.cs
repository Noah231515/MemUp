
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

            modelBuilder.Entity<Word>()
                .HasMany(w => w.Sentences)
                .WithOne(s => s.Word);
            
            // Sentence DB Model Builder
            modelBuilder.Entity<Sentence>()
                .HasKey(x => x.Id);
            
            modelBuilder.Entity<Sentence>()
                .Property(x => x.SentenceText).HasMaxLength(50);

            // SentenceType DB Builder
            modelBuilder.Entity<SentenceType>()
                .HasKey(x => x.Id);
            
            modelBuilder.Entity<SentenceType>()
                .Property(x => x.Type).HasMaxLength(10);
            
            modelBuilder.Entity<SentenceType>()
                .HasMany(st => st.Sentences)
                .WithOne(s => s.SentenceType);
            
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
            
            // CourseUser DB Model Builder
            modelBuilder.Entity<CourseUser>()
                .HasKey(cu => new { cu.CourseId, cu.ApplicationUserId });

            modelBuilder.Entity<CourseUser>()
                .HasOne(cu => cu.Course)
                .WithMany(c => c.CourseUsers)
                .HasForeignKey(cu => cu.CourseId);

            modelBuilder.Entity<CourseUser>()
                .HasOne(cu => cu.ApplicationUser)
                .WithMany(u => u.CourseUsers)
                .HasForeignKey(cu => cu.ApplicationUserId);
            
                
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