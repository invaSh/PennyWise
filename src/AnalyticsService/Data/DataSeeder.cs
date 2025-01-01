using AnalyticsService.Models;

namespace AnalyticsService.Data
{
    public class DataSeeder
    {
        private readonly AnalyticsDbContext _context;

        public DataSeeder(AnalyticsDbContext context)
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
                "Food",
                "Transportation",
                "Utilities",
                "Entertainment",
                "Healthcare",
                "Education",
                "Miscellaneous"
            };

            for (int i = 0; i < 20; i++)
            {
                var randomDays = random.Next(0, 365);
                var randomDate = DateTime.Now.AddDays(-randomDays).ToUniversalTime();

                var expense = new Expense
                {
                    Amount = Math.Round((decimal)(random.NextDouble() * 200), 2),
                    Description = $"Sample Expense {random.Next(1, 1000)}",
                    Category = categories[random.Next(categories.Length)], // Category is now a string
                    Date = randomDate // Use UTC date
                };

                _context.Expenses.Add(expense);
            }

            await _context.SaveChangesAsync();
            Console.WriteLine("Database successfully seeded with random expenses.");
        }

        public async Task SeedIncomesAsync()
        {
            if (_context.Incomes.Any())
            {
                Console.WriteLine("Database already contains income data. Skipping seeding.");
                return;
            }

            var random = new Random();
            var incomeTypes = new[] { "Salary", "Freelance" };

            for (int monthOffset = 0; monthOffset < 12; monthOffset++)
            {
                var baseDate = DateTime.Now.AddMonths(-monthOffset);
                var salaryIncome = new Income
                {
                    Amount = 1600,
                    DateReceived = new DateTime(baseDate.Year, baseDate.Month, 1).ToUniversalTime(),
                    Type = "Salary"
                };

                _context.Incomes.Add(salaryIncome);

                var freelanceCount = random.Next(1, 5);

                for (int i = 0; i < freelanceCount; i++)
                {
                    var freelanceIncome = new Income
                    {
                        Amount = Math.Round((decimal)(random.NextDouble() * 1000 + 500), 2),
                        DateReceived = new DateTime(baseDate.Year, baseDate.Month, random.Next(1, 28)).ToUniversalTime(),
                        Type = "Freelance"
                    };

                    _context.Incomes.Add(freelanceIncome);
                }
            }

            await _context.SaveChangesAsync();
            Console.WriteLine("Database successfully seeded with random incomes.");
        }
    }
}
