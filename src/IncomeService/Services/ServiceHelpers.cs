using IncomeService.Data;
using Microsoft.EntityFrameworkCore;

namespace IncomeService.Services
{
    public class ServiceHelpers
    {
        private readonly IncSvcDbContext _context;

        public ServiceHelpers(IncSvcDbContext context)
        {
            _context = context;
        }

        public async Task<DateTime?> GetLastPayDate()
        {
            var lastPayDate = await _context.Incomes
                .Where(i => i.Type.Equals("Salary"))
                .OrderByDescending(i => i.DateReceived)
                .Select(i => i.DateReceived)
                .FirstOrDefaultAsync();
            return lastPayDate;
        }

        public async  Task<decimal> GetTotalSinceLastPaycheck()
        {
            var lastPayDate = await GetLastPayDate();
            var total = await _context.Expenses
                .Where(e => e.Date >= lastPayDate)
                .SumAsync(e => e.Amount);
            return total;
        }
    }
}
