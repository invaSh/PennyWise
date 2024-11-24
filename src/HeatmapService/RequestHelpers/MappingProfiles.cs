using AutoMapper;
using Shared.Consumers.Expenses;
using Shared.Contracts.Expenses;
using Shared.Models;

namespace HeatmapService.RequestHelpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<ExpenseCreated, Expense>();
            CreateMap<ExpenseUpdated, Expense>();
            CreateMap<ExpenseDeleted, Expense>();
        }
    }
}
