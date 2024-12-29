using AutoMapper;
using Shared.Contracts.Expenses;
using ExpenseService.DTOs;
using ExpenseService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Contracts.Incomes;

namespace Shared.RequestHelpers
{
    public class MappingProfiles  : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Expense, ExpenseDto>();
            CreateMap<ExpenseDto, Expense>();
            CreateMap<Expense, ExpenseCreated>();
            CreateMap<Expense, ExpenseUpdated>();
            CreateMap<Expense, ExpenseDeleted>();
            CreateMap<IncomeCreated, Income>();
            CreateMap<IncomeUpdated, Income>();
            CreateMap<IncomeDeleted, Income>();
        }

    }
}
