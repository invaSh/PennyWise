using AnalyticsService.Data;
using Microsoft.EntityFrameworkCore;

namespace AnalyticsService.Services
{
    public class ServiceHelper
    {
        private readonly AnalyticsDbContext _context;
        private readonly ILogger<ServiceHelper> _logger;
        public ServiceHelper(AnalyticsDbContext context, ILogger<ServiceHelper> logger)
        {
            _context = context;
            _logger = logger;
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
            _logger.LogInformation("====>Expenses Amount: {Expenses}", expenses);
            var balance = await _context.Balances.SingleOrDefaultAsync();
            var monthlyIncome = await _context.Incomes
                .Where(x => x.DateReceived >= lastPayDate)
                .SumAsync(e => e.Amount);
            _logger.LogInformation("====>Monthly Income Amount: {MonthlyIncome}", monthlyIncome);

            decimal budgetUtilization = 0;
            if (balance.CurrentBalance != 0)
            {
                budgetUtilization = Math.Round((expenses / monthlyIncome) * 100, 1);
            }
            else if(balance.CurrentBalance == 0 && expenses == 0)
            {
                return 0;
            }
            else
            {
                return 100;
            }
            return budgetUtilization;
        }

        public async Task<decimal> GetTotalSinceLastPaycheck()
        {
            var lastPayDate = await GetLastPayDate();
            var total = await _context.Expenses
                .Where(e => e.Date >= lastPayDate)
                .SumAsync(e => e.Amount);
            return total;
        }

        public DateTime? GetYearlyDate()
        {
            var currentMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
            currentMonth = DateTime.SpecifyKind(currentMonth, DateTimeKind.Utc);
            var lastYear = currentMonth.AddMonths(-12);
            return lastYear;
        }
    }
}
