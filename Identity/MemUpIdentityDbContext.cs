using MemUp.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MemUp.Data
{
    public class MemUpIdentityDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public MemUpIdentityDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Course> Courses { get; set; }
        
    }
}
