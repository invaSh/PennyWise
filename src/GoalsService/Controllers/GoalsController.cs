using AutoMapper;
using GoalsService.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.DTOs;
using Shared.Models;

namespace GoalsService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly GoalDbContext _context;
        private readonly IMapper _mapper;
        public GoalsController(GoalDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetGoals()
        {
            var goals = await _context.Goals.ToListAsync();
            if (goals.Count == 0) return NotFound("No goals");
            return Ok(goals);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetGoal(int id)
        {
            var goals = await _context.Goals.FirstOrDefaultAsync(x => x.Id == id);
            if (goals == null) return NotFound("Such an goals does not exist!");
            return Ok(goals);
        }

        [HttpPost]
        public async Task<ActionResult> CreateGoal(GoalDto dto)
        {
            if (dto == null) return BadRequest("No goal was submitted!");
            var goal = _mapper.Map<Goal>(dto);
            _context.Goals.Add(goal);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("There was an error saving your goal..");
            return Ok(new { msg = "Goal saved successfully!", goal = goal });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGoal(int id, GoalDto dto)
        {
            var goal = await _context.Goals.FirstOrDefaultAsync(x => x.Id == id);
            if (goal == null) return NotFound("The requested goal does not exist..");
            _mapper.Map(dto, goal);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("There was a problem updating the expense..");
            return Ok(new { msg = "Expense was updated!", expegoalnse = goal });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGoal(int id)
        {
            var goal = await _context.Goals.FirstOrDefaultAsync(x => x.Id == id);
            if (goal == null) return NotFound("The requested goal was not found!");
            _context.Goals.Remove(goal);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Couldn't delete goal");
            return Ok("Goal successfully deleted!");
        }



    }
}
