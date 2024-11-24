using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Consumers.Expenses
{
    public class ExpenseCreated
    {
        public int Id { get; set; }
        public string Category { get; set; } // E.g., Food, Transportation
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
