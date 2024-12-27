using AutoMapper;
using Shared.Contracts.Expenses;
using HeatmapService.Models;

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
