using AnalyticsService.Data;
using AnalyticsService.Models;
using AutoMapper;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Incomes;

namespace AnalyticsService.Consumers
{
    public class IncomeCreatedConsumer : IConsumer<IncomeCreated>
    {
        private readonly AnalyticsDbContext _context;
        private readonly IMapper _mapper;
        public IncomeCreatedConsumer(AnalyticsDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<IncomeCreated> context)
        {
            Console.WriteLine("==>Consuming income with ID: " + context.Message.Id);
            var balance = await _context.Balances.FirstOrDefaultAsync();
            var income = _mapper.Map<Income>(context.Message);
            _context.Add(income);
            balance.CurrentBalance += income.Amount;
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error saving the income to the database.");
            Console.WriteLine("==>Income add sucessful");
        }
    }
}
