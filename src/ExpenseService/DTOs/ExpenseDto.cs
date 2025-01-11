using ExpenseService.Models;

namespace ExpenseService.DTOs
{
    public class ExpenseDto
    {
        public Category Category { get; set; } // E.g., Food, Transportation
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}
