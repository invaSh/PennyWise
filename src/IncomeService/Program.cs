using IncomeService.Consumers;
using IncomeService.Data;
using IncomeService.Models;
using IncomeService.Services;
using MassTransit;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});

builder.Services.AddDbContext<IncSvcDbContext>
    (o => o.UseNpgsql(builder.Configuration.GetConnectionString("IncSvcConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<ExpenseCreatedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("income", false));
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.ConfigureEndpoints(context);
    });
});
builder.Services.AddScoped<ServiceHelpers>();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<IncSvcDbContext>();
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

    var seeder = new DataSeeder(context);
    await seeder.SeedIncomesAsync();
}
app.Run();

