using AutoMapper;
using HeatmapService.Data;
using MassTransit;
using Shared.Contracts.Expenses;

namespace HeatmapService.Consumers
{
    public class ExpenseUpdatedConsumer : IConsumer<ExpenseUpdated>
    {
        private readonly HeatmapDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<ExpenseUpdatedConsumer> _logger;

        public ExpenseUpdatedConsumer(HeatmapDbContext context, IMapper mapper, ILogger<ExpenseUpdatedConsumer> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task Consume(ConsumeContext<ExpenseUpdated> context)
        {
            var expense = await _context.Expenses.FindAsync(context.Message.Id);
            if (expense == null)
            {
                _logger.LogWarning("Expense with ID {MessageId} does not exist.", context.Message.Id);
                return;
            }
            _mapper.Map(context.Message, expense);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                _logger.LogError("Failed to update expense with ID {MessageId}.", context.Message.Id);
                return;
            }
            _logger.LogInformation("Expense with ID {MessageId} updated successfully.", context.Message.Id);
        }
    }
}
