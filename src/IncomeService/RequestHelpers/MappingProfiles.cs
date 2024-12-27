using AutoMapper;
using IncomeService.Models;
using IncomeService.DTOs;

namespace IncomeService.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Income, IncomeDto>();
            CreateMap<IncomeDto, Income>();
        }
    }
}
