using AutoMapper;
using ExpenseService.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Incomes;

namespace ExpenseService.Consumers
{
    public class IncomeUpdatedConsumer : IConsumer<IncomeUpdated>
    {
        private readonly ExpSvcDbContext _context;
        private readonly IMapper _mapper;

        public IncomeUpdatedConsumer(ExpSvcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<IncomeUpdated> context)
        {
            Console.WriteLine("==>Updating income with ID: " + context.Message.Id);
            var income = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == context.Message.Id);
            _mapper.Map(context.Message, income);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error saving the income to the database.");
            Console.WriteLine("==>Income updated");
        }
    }
}
