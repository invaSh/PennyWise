using AutoMapper;
using HeatmapService.Data;
using MassTransit;
using Shared.Contracts.Expenses;

namespace HeatmapService.Consumers
{
    public class ExpenseDeletedConsumer : IConsumer<ExpenseDeleted>
    {
        private readonly HeatmapDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<ExpenseUpdatedConsumer> _logger;
        public ExpenseDeletedConsumer(HeatmapDbContext context, ILogger<ExpenseUpdatedConsumer> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }
        public async Task Consume(ConsumeContext<ExpenseDeleted> context)
        {
            var expense = await _context.Expenses.FindAsync(context.Message.Id);
            if (expense == null)
            {
                _logger.LogWarning("Expense with ID {MessageId} does not exist.", context.Message.Id);
                return;
            }
            _mapper.Map(context.Message, expense);
            _context.Remove(expense);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                _logger.LogError("Failed to delete expense with ID {MessageId}.", context.Message.Id);
                return;
            }
            _logger.LogInformation("Expense with ID {MessageId} deleted successfully.", context.Message.Id);

        }
    }
}
