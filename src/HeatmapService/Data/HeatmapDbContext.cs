using Microsoft.EntityFrameworkCore;
using Shared.Models;

namespace HeatmapService.Data
{
    public class HeatmapDbContext:DbContext 
    {
        public HeatmapDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Expense> Expenses { get; set; }
    }
}
