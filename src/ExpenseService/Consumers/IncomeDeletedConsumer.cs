using AutoMapper;
using ExpenseService.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Incomes;

namespace ExpenseService.Consumers
{
    public class IncomeDeletedConsumer : IConsumer<IncomeDeleted>
    {
        private readonly ExpSvcDbContext _context;
        private readonly IMapper _mapper;
        public IncomeDeletedConsumer(ExpSvcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<IncomeDeleted> context)
        {
            Console.WriteLine("==>Consuming deleted item with ID: " + context.Message.Id);
            var income = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == context.Message.Id);
            _context.Incomes.Remove(income);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error deleting the income.");
            Console.WriteLine("==>Income deleted");
        }
    }
}