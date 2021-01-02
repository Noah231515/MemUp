
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
            modelBuilder.Entity<Course>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Course>()
                .HasIndex(x => x.Id)
                .IsUnique();

            modelBuilder.Entity<Course>()
                .Property(x => x.Name).HasMaxLength(50);
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