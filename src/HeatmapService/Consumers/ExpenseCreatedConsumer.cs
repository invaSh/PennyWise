using AutoMapper;
using HeatmapService.Data;
using MassTransit;
using Shared.Contracts.Expenses;
using HeatmapService.Models;

namespace HeatmapService.Consumers
{
    public class ExpenseCreatedConsumer : IConsumer<ExpenseCreated>
    {
        private readonly HeatmapDbContext _context;
        private readonly IMapper _mapper;

        public ExpenseCreatedConsumer(HeatmapDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task Consume(ConsumeContext<ExpenseCreated> context)
        {
            _context.Expenses.Add(_mapper.Map<Expense>(context.Message));
            var result = await _context.SaveChangesAsync() > 0;
            if(!result) throw new InvalidOperationException("There was an error saving the expense to the database.");
            Console.WriteLine("Expense consumed successfully!");
        }
    }
}
