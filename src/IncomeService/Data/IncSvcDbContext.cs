using IncomeService.Models;
using Microsoft.EntityFrameworkCore;

namespace IncomeService.Data
{
    public class IncSvcDbContext : DbContext
    {
        public IncSvcDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expense>  Expenses { get; set; }
        public DbSet<Balance> Balances { get; set; }

    }
}
