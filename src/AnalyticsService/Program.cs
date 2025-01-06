
using AnalyticsService.Consumers;
using AnalyticsService.Data;
using AnalyticsService.Models;
using AnalyticsService.Services;
using MassTransit;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AnalyticsDbContext>
    (o => o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<ExpenseCreatedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("analytics", false));
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.ConfigureEndpoints(context);
    });
});
builder.Services.AddScoped<ServiceHelper>();


var app = builder.Build();


app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AnalyticsDbContext>();
    if (!await context.Balances.AnyAsync())
    {
        context.Balances.Add(new Balance
        {
            Id = 1,
            CurrentBalance = 0
        });

        await context.SaveChangesAsync();
        Console.WriteLine("Balance table seeded with an initial record.");
    }
    else
    {
        Console.WriteLine("Balance table already contains data. No seeding required.");
    }
    //var seeder = new DataSeeder(context);
    //await seeder.SeedIncomesAsync();
    //await seeder.SeedExpensesAsync();
}

app.Run();
