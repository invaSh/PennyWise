using AutoMapper;
using IncomeService.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Expenses;

namespace IncomeService.Consumers
{
    public class ExpenseUpdatedConsumer : IConsumer<ExpenseUpdated>
    {
        private readonly IncSvcDbContext _context;
        private readonly IMapper _mapper;
        public ExpenseUpdatedConsumer(IncSvcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task Consume(ConsumeContext<ExpenseUpdated> context)
        {
            Console.WriteLine("==>Consuming expense with id: " + context.Message.Id);
            var expense = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == context.Message.Id);
            var balance = await _context.Balances.SingleOrDefaultAsync();
            Console.WriteLine("==>Current balance with id " + balance.Id + " is " + balance.CurrentBalance);
            Console.WriteLine("==>Old expense amount is " + expense.Amount);
            Console.WriteLine("==>New expense amount is " + context.Message.Amount);

            decimal existingAmount = expense.Amount;
            expense.Amount = context.Message.Amount;
            expense.Date = DateTime.UtcNow;
            if (existingAmount != context.Message.Amount)
            {
                balance.CurrentBalance += (existingAmount);
                balance.CurrentBalance -= context.Message.Amount;
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (result) Console.WriteLine("==>Expense Updated");
        }
    }
   
}
