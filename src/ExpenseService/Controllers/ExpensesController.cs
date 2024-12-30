using AutoMapper;
using ExpenseService.Data;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Expenses;
using ExpenseService.DTOs;
using ExpenseService.Models;
using ExpenseService.ServiceHelpers;

namespace ExpenseService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpSvcDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly ServiceHelper _serviceHelper;
        public ExpensesController(ExpSvcDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint, ServiceHelper serviceHelper)
        {
            _context = context;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
            _serviceHelper = serviceHelper;
        }

        [HttpGet]
        public async Task<ActionResult> GetExpenses()
        {
            var expenses = await _context.Expenses.ToListAsync();
            if (expenses.Count == 0) return NotFound("No Expenses");
            return Ok(expenses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetExpense(int id)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(x=> x.Id == id);
            if (expense == null) return NotFound("Such an expense does not exist!");
            return Ok(expense);
        }

        [HttpPost]
        public async Task<ActionResult> CreateExpense(ExpenseDto dto)
        {
            if (dto == null) return BadRequest("No Expense was submitted!");
            var expense = _mapper.Map<Expense>(dto);
            _context.Expenses.Add(expense);
            expense.Date = DateTime.UtcNow;
            var result = await _context.SaveChangesAsync() > 0;
            await _publishEndpoint.Publish(_mapper.Map<ExpenseCreated>(expense));
            if(!result) return BadRequest("There was an error saving your expense..");
            return Ok(new {msg = "Expense saved successfully!", expense = expense });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateExpense(int id, ExpenseDto dto)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == id);
            if (expense == null) return NotFound("The requested expense does not exist..");
            _mapper.Map(dto, expense);
            expense.Id = id;
            await _publishEndpoint.Publish(_mapper.Map<ExpenseUpdated>(expense));
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("There was a problem updating the expense..");
            return Ok(new { msg = "Expense was updated!", expense = expense });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == id);
            if (expense == null) return NotFound("The requested Expense was not found!");
            _context.Expenses.Remove(expense);
            await _publishEndpoint.Publish(_mapper.Map<ExpenseDeleted>(expense));
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Couldn't delete expense");
            return Ok("Expense successfully deleted!");
        }

        [HttpGet("category/{cat}")]
        public async Task<ActionResult> GetExpByCategory(Category cat)
        {
            var expenses = await _context.Expenses.Where(x => x.Category.Equals(cat)).ToListAsync();
            if (expenses.Count <= 0) return NotFound("No expenses where found!");
            return Ok(expenses);
        }

        [HttpGet("monthly")]
        public async Task<ActionResult<decimal>> GetTotalExpense()
        {
            var total = await _serviceHelper.GetTotalSinceLastPaycheck();
            return Ok(total);
        }

    }
}
