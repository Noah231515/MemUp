
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.EntityFrameworkCore;

// namespace PCRanker.Models
// {
//     public class PCRankerContext : DbContext
//     {
//         public PCRankerContext(DbContextOptions<PCRankerContext> options)
//             : base(options)
//         {
//         }
//         public PCRankerContext()
//         {
//         }
//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             modelBuilder.Entity<Part>()
//                 .HasIndex(p => p.ID)
//                 .IsUnique();

//                 modelBuilder.Entity<BuildPart>()
//                     .HasKey(bp => new {bp.BuildID, bp.PartID });
//                 modelBuilder.Entity<BuildPart>()
//                     .HasOne(bp => bp.Build)
//                     .WithMany(b => b.BuildPart)
//                     .HasForeignKey(bp => bp.BuildID);
//                 modelBuilder.Entity<BuildPart>()
//                     .HasOne(bp => bp.Part)
//                     .WithMany(p => p.BuildPart)
//                     .HasForeignKey(bp => bp.PartID);


//         }
//         protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//         {
//             if (!optionsBuilder.IsConfigured)
//             {
//                 optionsBuilder.UseSqlServer("Server=.\\;Database=PCRanker;Trusted_Connection=True;");
//             }
//         }

//         public DbSet<Build> Builds { get; set; }
//         public DbSet<BuildPart> BuildParts { get; set; }
//         public DbSet<Part> Parts { get; set; }
//         public DbSet<PartType> PartTypes { get; set; }
//     }
// }
