namespace GoalsService.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public DateTime TargetDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Description { get; set; }
        public GoalStatus Status { get; set; }
    }
}
