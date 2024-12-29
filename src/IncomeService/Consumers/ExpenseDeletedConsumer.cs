using AutoMapper;
using IncomeService.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Expenses;

namespace IncomeService.Consumers
{
    public class ExpenseDeletedConsumer : IConsumer<ExpenseDeleted>
    {
        private readonly IncSvcDbContext _context;
        private readonly IMapper _mapper;

        public ExpenseDeletedConsumer(IncSvcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<ExpenseDeleted> context)
        {
            var balance = await _context.Balances.SingleOrDefaultAsync();
            var lastPayDate =  await _context.Incomes
                .Where(i => i.Type.Equals("Salary"))
                .OrderByDescending(i => i.DateReceived)
                .Select(i => i.DateReceived)
                .FirstOrDefaultAsync();
            var expense = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == context.Message.Id);
             _context.Expenses.Remove(expense);
            if (expense.Date >= lastPayDate) 
            {
                balance.CurrentBalance += expense.Amount;
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) Console.WriteLine("====>Couldn't delete item");
            Console.WriteLine("====>Expense deleted");
        }
    }
}
