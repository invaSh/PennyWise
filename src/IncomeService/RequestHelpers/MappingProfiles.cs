using AutoMapper;
using Shared.DTOs;
using Shared.Models;

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
