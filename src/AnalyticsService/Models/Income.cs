namespace AnalyticsService.Models
{
    public class Income
    {
        public int Id { get; set; }
        public string Source { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateReceived { get; set; }
        public string Type { get; set; }
    }
}
