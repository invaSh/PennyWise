using AnalyticsService.Data;
using AutoMapper;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Incomes;

namespace AnalyticsService.Consumers
{
    public class IncomeUpdatedConsumer : IConsumer<IncomeUpdated>
    {
        private readonly AnalyticsDbContext _context;
        private readonly IMapper _mapper;
        public IncomeUpdatedConsumer(AnalyticsDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<IncomeUpdated> context)
        {
            Console.WriteLine("==>Updating income with ID: " + context.Message.Id);
            var balance = await _context.Balances.SingleOrDefaultAsync();
            var income = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == context.Message.Id);
            var oldIncomeAmount = income.Amount; 
            _mapper.Map(context.Message, income);
            if (oldIncomeAmount != income.Amount)
            {
                balance.CurrentBalance -= oldIncomeAmount;
                balance.CurrentBalance += income.Amount;

            }
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error saving the income to the database.");
            Console.WriteLine("==>Income updated");
        }
    }
}
