using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Contracts.Incomes
{
    public class IncomeUpdated
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateReceived { get; set; }
        public string Type { get; set; }
    }
}
