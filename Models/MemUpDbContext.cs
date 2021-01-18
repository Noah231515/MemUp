
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
            
            modelBuilder.Entity<Course>()
                .HasMany(x => x.Words)
                .WithMany(x => x.Courses);
            
            modelBuilder.Entity<Course>()
                .HasMany(x => x.Users)
                .WithMany(x => x.Courses);

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
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Data Source=MemUp.db");
            }
        }

        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<Course> Courses { get; set;}
        public DbSet<Word> Word { get; set; }
        public DbSet<Sentence> Sentence { get; set; }
        public DbSet<SentenceType> SentenceType { get; set; }
    }
}