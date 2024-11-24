using HeatmapService.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HeatmapService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeatmapController : ControllerBase
    {
        private readonly HeatmapDbContext _context;
        public HeatmapController(HeatmapDbContext context)
        {
            _context = context;
        }

        [HttpGet("expenses")]
        public async Task<ActionResult> GetDailyExpenses()
        {
            var expenses = await _context.Expenses.ToListAsync();
            var heatmap = new Dictionary<DateTime, decimal>();
            foreach (var expense in expenses)
            {
                DateTime date = expense.Date;
                decimal amount = expense.Amount;
                if (!(heatmap.ContainsKey(date)))
                {
                    heatmap.Add(date, amount);
                }
                else
                {
                    heatmap[date] += amount;
                }
            }
            return Ok(heatmap);
        }
    }
}
