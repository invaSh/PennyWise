using AutoMapper;
using GoalsService.DTOs;
using GoalsService.Models;

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
