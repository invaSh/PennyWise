using ExpenseService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<ExpSvcDbContext>(o=> o.UseNpgsql(builder.Configuration.GetConnectionString("ExpServiceConnection")));

var app = builder.Build();


app.UseHttpsRedirection();



app.Run();
