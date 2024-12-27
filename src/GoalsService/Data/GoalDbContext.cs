using Microsoft.EntityFrameworkCore;
using GoalsService.Models;

namespace GoalsService.Data
{
    public class GoalDbContext : DbContext
    {
        public GoalDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Goal> Goals {  get; set; } 
    }
}
