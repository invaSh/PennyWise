using AnalyticsService.Models;
using AutoMapper;
using Shared.Contracts.Expenses;
using Shared.Contracts.Incomes;

namespace AnalyticsService.RequestHelpers
{
    public class MappingProfiles   : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ExpenseCreated, Expense>();
            CreateMap<IncomeCreated, Income>();
            CreateMap<IncomeUpdated, Income>();

        }
    }
}
