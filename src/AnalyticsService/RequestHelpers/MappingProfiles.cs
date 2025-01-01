using AnalyticsService.Models;
using AutoMapper;
using Shared.Contracts.Expenses;

namespace AnalyticsService.RequestHelpers
{
    public class MappingProfiles   : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ExpenseCreated, Expense>();

        }
    }
}
