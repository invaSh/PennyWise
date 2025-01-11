using ExpenseService.Data;
using Microsoft.EntityFrameworkCore;

namespace ExpenseService.ServiceHelpers
{
    public class ServiceHelper
    {
        private readonly ExpSvcDbContext _context;

        public ServiceHelper(ExpSvcDbContext context)
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

        public async Task<decimal> GetTotalSinceLastPaycheck()
        {
            var lastPayDate = await GetLastPayDate();
            var total = await _context.Expenses
                .Where(e => e.Date >= lastPayDate)
                .SumAsync(e => e.Amount);
            return total;
        }

        public DateTime? WeeklyDate()
        {
            var week = DateTime.UtcNow.AddDays(-7);
            return week;
        }

        public DateTime? GetYearlyDate()
        {
            var lastYear = DateTime.UtcNow.AddDays(-364);
            return lastYear;
        }
    }
}
