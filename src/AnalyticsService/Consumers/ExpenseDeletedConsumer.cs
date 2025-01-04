using AnalyticsService.Data;
using AnalyticsService.Services;
using AutoMapper;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Shared.Contracts.Expenses;

namespace AnalyticsService.Consumers
{
    public class ExpenseDeletedConsumer : IConsumer<ExpenseDeleted>
    {
        private readonly AnalyticsDbContext _context;
        private readonly IMapper _mapper;
        private readonly ServiceHelper _serviceHelper;
        public ExpenseDeletedConsumer(AnalyticsDbContext context, IMapper mapper, ServiceHelper serviceHelper)
        {
            _context = context;
            _mapper = mapper;
            _serviceHelper = serviceHelper;
        }

        public async Task Consume(ConsumeContext<ExpenseDeleted> context)
        {
            Console.WriteLine("====>Deleting expense with ID: " + context.Message.Id);
            var balance = await _context.Balances.SingleOrDefaultAsync();
            var lastPayDate = await _serviceHelper.GetLastPayDate();
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
