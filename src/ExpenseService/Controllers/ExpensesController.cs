﻿using AutoMapper;
using ExpenseService.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.DTOs;
using Shared.Models;

namespace ExpenseService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpSvcDbContext _context;
        private readonly IMapper _mapper;
        public ExpensesController(ExpSvcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
            var result = await _context.SaveChangesAsync() > 0;
            if(!result) return BadRequest("There was an error saving your expense..");
            return Ok(new {msg = "Expense saved successfully!", expense = expense });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateExpense(int id, ExpenseDto dto)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == id);
            if (expense == null) return NotFound("The requested expense does not exist..");
            _mapper.Map(dto, expense);
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
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Couldn't delete expense");
            return Ok("Expense successfully deleted!");
        }

        [HttpGet("category/{cat}")]
        public async Task<ActionResult> GetExpByCategory(Category cat)
        {
            var expenses = await _context.Expenses.Where(x => x.Category == cat).ToListAsync();
            if (expenses.Count <= 0) return NotFound("No expenses where found!");
            return Ok(expenses);
        }

        [HttpGet("total")]
        public async Task<ActionResult> GetTotal()
        {
            var sevenDays = DateTime.UtcNow.AddDays(-7);
            var expenses = await _context.Expenses.Where(x => x.Date >  sevenDays).ToListAsync();
            decimal sum = 0;
            foreach(var expense in expenses)
            {
                sum += expense.Amount;
            }
            return Ok(sum);
        }

    }
}