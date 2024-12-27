namespace IncomeService.DTOs
{
    public class IncomeDto
    {
        public string Source { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateReceived { get; set; }
        public string Type { get; set; }
    }
}
