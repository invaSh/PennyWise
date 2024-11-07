using AutoMapper;
using Shared.DTOs;
using Shared.Models;

namespace GoalsService.RequestHelpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Goal, GoalDto>();
            CreateMap<GoalDto, Goal>();
        }
    }
}
