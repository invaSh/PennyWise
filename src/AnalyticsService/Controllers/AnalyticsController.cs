using AnalyticsService.Data;
using AnalyticsService.Services;
using MassTransit.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AnalyticsService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly AnalyticsDbContext _context;
        private readonly ServiceHelper _serviceHelper;
        public AnalyticsController(AnalyticsDbContext context, ServiceHelper serviceHelper)
        {
            _context = context;
            _serviceHelper = serviceHelper;
        }

        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var balance = await _context.Balances.SingleOrDefaultAsync();
            return Ok(balance);
        }

        [HttpGet("monthly")]
        public async Task<ActionResult<decimal>> GetTotalExpense()
        {
            var total = await _serviceHelper.GetTotalSinceLastPaycheck();
            return Ok(total);
        }

        [HttpGet("budget")]
        public async Task<IActionResult> GetBudgetUtilization()
        {
            var budget = await _serviceHelper.CalculateBudgetUtilization();
            return Ok(budget);
        }

        [HttpGet("yearly")]
        public async Task<ActionResult<decimal>> GetTotalYearlyExpenses()
        {
            var year = _serviceHelper.GetYearlyDate();
            var expenses = await _context.Expenses
                .Where(x => x.Date >= year.Value)
                .Select(x => new { x.Date, x.Amount })
                .ToListAsync();

            var monthly = expenses
                .GroupBy(x => new { x.Date.Year, x.Date.Month })
                .Select(m => new
                {
                    Date = new DateTime(m.Key.Year, m.Key.Month, 1).Date,
                    Month = new DateTime(m.Key.Year, m.Key.Month, 1).ToString("MMMM"),
                    Amount = m.Sum(x => x.Amount),
                })
                .OrderBy(o => o.Date)
                .ToList();

            return Ok(monthly);
        }

    }
}
