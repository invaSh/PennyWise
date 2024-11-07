using IncomeService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<IncSvcDbContext>
    (o => o.UseNpgsql(builder.Configuration.GetConnectionString("IncSvcConnection")));
var app = builder.Build();

app.UseHttpsRedirection();

app.Run();

