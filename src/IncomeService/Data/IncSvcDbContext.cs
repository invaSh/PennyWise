using Microsoft.EntityFrameworkCore;
using Shared.Models;

namespace IncomeService.Data
{
    public class IncSvcDbContext : DbContext
    {
        public IncSvcDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Income> Incomes { get; set; }
    }
}
