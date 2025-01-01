namespace AnalyticsService.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Category { get; set; } // E.g., Food, Transportation
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
