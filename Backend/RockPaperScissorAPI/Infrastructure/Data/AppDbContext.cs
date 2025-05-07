using RockPaperScissorAPI.Domain;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore; 

namespace RockPaperScissorAPI.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Player> Players { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
