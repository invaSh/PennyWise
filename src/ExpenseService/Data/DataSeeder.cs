using Shared.Models;

namespace ExpenseService.Data
{
    public class DataSeeder
    {
        private readonly ExpSvcDbContext _context;

        public DataSeeder(ExpSvcDbContext context)
        {
            _context = context;
        }

        public async Task SeedExpensesAsync()
        {
            if (_context.Expenses.Any())
            {
                Console.WriteLine("Database already contains expense data. Skipping seeding.");
                return;
            }

            var random = new Random();

            var categories = new[]
            {
                Category.Food,
                Category.Transportation,
                Category.Utilities,
                Category.Entertainment,
                Category.Healthcare,
                Category.Education,
                Category.Miscellaneous
            };

            for (int i = 0; i < 20; i++)
            {
                var randomDays = random.Next(0, 365);
                var randomDate = DateTime.Now.AddDays(-randomDays).ToUniversalTime(); 

                var expense = new Expense
                {
                    Amount = Math.Round((decimal)(random.NextDouble() * 200), 2),
                    Description = $"Sample Expense {random.Next(1, 1000)}",
                    Category = categories[random.Next(categories.Length)],
                    Date = randomDate // Use UTC date
                };

                _context.Expenses.Add(expense);
            }


            await _context.SaveChangesAsync();
            Console.WriteLine("Database successfully seeded with random expenses.");
        }
    }
}
