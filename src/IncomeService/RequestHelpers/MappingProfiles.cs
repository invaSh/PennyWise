using AutoMapper;
using IncomeService.Models;
using IncomeService.DTOs;
using Shared.Contracts.Expenses;

namespace IncomeService.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Income, IncomeDto>();
            CreateMap<IncomeDto, Income>();
            CreateMap<ExpenseCreated, Expense>();
            CreateMap<ExpenseUpdated, Expense>();
        }
    }
}
