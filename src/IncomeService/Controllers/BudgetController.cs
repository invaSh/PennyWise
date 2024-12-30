using IncomeService.Data;
using IncomeService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IncomeService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly IncSvcDbContext _context;
        private readonly ServiceHelpers _serviceHelpers;
        public BudgetController(IncSvcDbContext context, ServiceHelpers serviceHelpers)
        {
            _context = context;
            _serviceHelpers = serviceHelpers;
        }

        [HttpGet]
        public async Task<IActionResult> GetBudgetUtilization()
        {
            var budget = await _serviceHelpers.CalculateBudgetUtilization();
            return Ok(budget);
        }

    }
}
