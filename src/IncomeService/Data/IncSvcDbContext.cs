using IncomeService.Models;
using Microsoft.EntityFrameworkCore;

namespace IncomeService.Data
{
    public class IncSvcDbContext : DbContext
    {
        public IncSvcDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Income> Incomes { get; set; }
    }
}
