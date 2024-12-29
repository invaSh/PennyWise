using AutoMapper;
using ExpenseService.Data;
using ExpenseService.Models;
using MassTransit;
using Shared.Contracts.Incomes;

namespace ExpenseService.Consumers
{
    public class IncomeCreatedConsumer : IConsumer<IncomeCreated>
    {
        private readonly ExpSvcDbContext _context;
        private readonly IMapper _mapper;

        public IncomeCreatedConsumer(ExpSvcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<IncomeCreated> context)
        {
            var income = _mapper.Map<Income>(context.Message);
            _context.Add(income);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error saving the income to the database.");
            Console.WriteLine("==>Income add sucessful");
        }
    }
}
