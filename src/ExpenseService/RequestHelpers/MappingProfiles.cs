﻿using AutoMapper;
using Shared.Consumers.Expenses;
using Shared.Contracts.Expenses;
using Shared.DTOs;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        }

    }
}
