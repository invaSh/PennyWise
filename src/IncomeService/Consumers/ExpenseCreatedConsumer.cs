using AutoMapper;
using IncomeService.Data;
using IncomeService.Models;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Expenses;

namespace IncomeService.Consumers
{
    public class ExpenseCreatedConsumer : IConsumer<ExpenseCreated>
    {
        private readonly IncSvcDbContext _context;
        private readonly IMapper _mapper;
        public ExpenseCreatedConsumer(IncSvcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task Consume(ConsumeContext<ExpenseCreated> context)
        {
            var balance = await _context.Balances.SingleOrDefaultAsync();
            var lastPayDate = await _context.Incomes
                .OrderByDescending(i => i.DateReceived)
                .Select(i => i.DateReceived)
                .FirstOrDefaultAsync();
            var expense = _mapper.Map<Expense>(context.Message);
            _context.Expenses.Add(expense);
            if (expense.Date >= lastPayDate)
            {
                balance.CurrentBalance -= expense.Amount;
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error saving the expense to the database.");
            Console.WriteLine("Expense consumed successfully!");
        }
    }
}
