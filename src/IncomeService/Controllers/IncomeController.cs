using AutoMapper;
using IncomeService.Data;
using IncomeService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IncomeService.DTOs;

namespace IncomeService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly IncSvcDbContext _context;
        private readonly IMapper _mapper;
        public IncomeController(IncSvcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult> GetExpenses()
        {
            var incomes = await _context.Incomes.ToListAsync();
            if (incomes.Count == 0) return NotFound("No incomes");
            return Ok(incomes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetExpense(int id)
        {
            var income = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == id);
            if (income == null) return NotFound("Such an income does not exist!");
            return Ok(income);
        }

        [HttpPost]
        public async Task<ActionResult> CreateIncome(IncomeDto dto)
        {
            if (dto == null) return BadRequest("No income was submitted!");
            var balance = await _context.Balances.FirstOrDefaultAsync();
            var income = _mapper.Map<Income>(dto);
            income.DateReceived = DateTime.UtcNow;
            _context.Incomes.Add(income);
            balance.CurrentBalance += income.Amount;
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("There was an error saving your income..");
            return Ok(new { msg = "Income saved successfully!", income = income });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateIncome(int id, IncomeDto dto)
        {
            var income = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == id);
            if (income == null) return NotFound("The requested income does not exist..");
            dto.DateReceived = DateTime.UtcNow;
            _mapper.Map(dto, income);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("There was a problem updating the income..");
            return Ok(new { msg = "Expense was updated!", income = income });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteIncome(int id)
        {
            var income = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == id);
            if (income == null) return NotFound("The requested income was not found!");
            _context.Incomes.Remove(income);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Couldn't delete income");
            return Ok("Income successfully deleted!");
        }

        [HttpGet("total")]
        public async Task<ActionResult> GetTotal()
        {
            var month = DateTime.UtcNow.AddDays(30);
            var incomes = await _context.Incomes.Where(x => x.DateReceived > month).ToListAsync();
            decimal sum = 0;
            foreach (var income in incomes)
            {
                sum += income.Amount;
            }
            return Ok(sum);
        }

        [HttpGet("balance")]
        public async Task<ActionResult> GetBalance()
        {
            var balance = await _context.Balances.FirstOrDefaultAsync();
            return Ok(balance.CurrentBalance);
        }
        
        [HttpGet("expenses")]
        public async Task<ActionResult<decimal>> GetExpense()
        {
            var lastPayDate = await _context.Incomes
                .Where(i => i.Type.Equals("Salary"))
                .OrderByDescending(i => i.DateReceived)
                .Select(i => i.DateReceived)
                .FirstOrDefaultAsync();
            var total = await _context.Expenses
                .Where(e => e.Date >= lastPayDate)
                .SumAsync(e => e.Amount);
            return Ok(total);
        }
    }
}
