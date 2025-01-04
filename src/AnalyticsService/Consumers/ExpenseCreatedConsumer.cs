using AnalyticsService.Data;
using AnalyticsService.Models;
using AutoMapper;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Expenses;

namespace AnalyticsService.Consumers
{
    public class ExpenseCreatedConsumer : IConsumer<ExpenseCreated>
    {
        private readonly AnalyticsDbContext _context;
        private readonly IMapper _mapper;
        public ExpenseCreatedConsumer(AnalyticsDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<ExpenseCreated> context)
        {
            Console.WriteLine("====>Consuming expense with ID: " + context.Message.Id);
            var balance = await _context.Balances.SingleOrDefaultAsync();
            var expense = _mapper.Map<Expense>(context.Message);
            _context.Expenses.Add(expense);
            balance.CurrentBalance -= expense.Amount;
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error saving the expense to the database.");
            Console.WriteLine("Expense consumed successfully!");
        }
    }
}
