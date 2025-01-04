using AnalyticsService.Data;
using Microsoft.EntityFrameworkCore;

namespace AnalyticsService.Services
{
    public class ServiceHelper
    {
        private readonly AnalyticsDbContext _context;
        public ServiceHelper(AnalyticsDbContext context)
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

        public async Task<decimal> totalExpense()
        {
            var lastPayDate = await GetLastPayDate();
            var total = await _context.Expenses
                .Where(e => e.Date >= lastPayDate)
                .SumAsync(e => e.Amount);
            return total;
        }

        public async Task<decimal> CalculateBudgetUtilization()
        {
            var lastPayDate = await GetLastPayDate();
            var expenses = await _context.Expenses
                .Where(x => x.Date >= lastPayDate)
                .SumAsync(e => e.Amount);
            var balance = await _context.Balances.SingleOrDefaultAsync();
            decimal budgetUtilization = 0;
            if (balance.CurrentBalance != 0)
            {
                budgetUtilization = Math.Round((expenses / balance.CurrentBalance) * 100, 1);
            }
            else
            {
                return 0;
            }
            return budgetUtilization;
        }
    }
}
