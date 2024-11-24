using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Contracts.Expenses
{
    public class ExpenseUpdated
    {
        public int Id { get; set; }
        public Category Category { get; set; } // E.g., Food, Transportation
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
