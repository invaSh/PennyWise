using AnalyticsService.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Incomes;

namespace AnalyticsService.Consumers
{
    public class IncomeDeletedConsumer : IConsumer<IncomeDeleted>
    {
        private readonly AnalyticsDbContext _context;

        public IncomeDeletedConsumer(AnalyticsDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<IncomeDeleted> context)
        {
            Console.WriteLine("==>Consuming deleted item with ID: " + context.Message.Id);
            var balance = await _context.Balances.FirstOrDefaultAsync();
            var income = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == context.Message.Id);
            _context.Incomes.Remove(income);
            if (balance.CurrentBalance != 0) balance.CurrentBalance -= income.Amount;
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error deleting the income.");
            Console.WriteLine("==>Income deleted");
        }
    }
}
