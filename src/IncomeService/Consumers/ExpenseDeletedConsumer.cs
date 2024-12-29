using AutoMapper;
using IncomeService.Data;
using IncomeService.Services;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Expenses;

namespace IncomeService.Consumers
{
    public class ExpenseDeletedConsumer : IConsumer<ExpenseDeleted>
    {
        private readonly IncSvcDbContext _context;
        private readonly IMapper _mapper;
        private readonly ServiceHelpers _serviceHelper;

        public ExpenseDeletedConsumer(IncSvcDbContext context, IMapper mapper, ServiceHelpers serviceHelper)
        {
            _context = context;
            _mapper = mapper;
            _serviceHelper = serviceHelper;
        }

        public async Task Consume(ConsumeContext<ExpenseDeleted> context)
        {
            var balance = await _context.Balances.SingleOrDefaultAsync();
            var lastPayDate =  await _serviceHelper.GetLastPayDate();
            var expense = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == context.Message.Id);
             _context.Expenses.Remove(expense);
            if (expense.Date >= lastPayDate) 
            {
                balance.CurrentBalance += expense.Amount;
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new InvalidOperationException("There was an error deleting the expense.");
            Console.WriteLine("====>Expense deleted");
        }
    }
}
