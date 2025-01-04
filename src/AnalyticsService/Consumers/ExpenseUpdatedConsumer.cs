using AnalyticsService.Data;
using AutoMapper;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Expenses;

namespace AnalyticsService.Consumers
{
    public class ExpenseUpdatedConsumer : IConsumer<ExpenseUpdated>
    {
        private readonly AnalyticsDbContext _context;

        public ExpenseUpdatedConsumer(AnalyticsDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<ExpenseUpdated> context)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == context.Message.Id);
            var balance = await _context.Balances.SingleOrDefaultAsync();
            decimal existingAmount = expense.Amount;
            expense.Amount = context.Message.Amount;
            expense.Date = DateTime.UtcNow;
            if (existingAmount != context.Message.Amount)
            {
                balance.CurrentBalance += existingAmount;
                balance.CurrentBalance -= context.Message.Amount;
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error saving the expense to the database.");

        }
    }
}
