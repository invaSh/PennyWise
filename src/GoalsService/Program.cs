using GoalsService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddControllers();

builder.Services.AddDbContext<GoalDbContext>
    (o => o.UseNpgsql(builder.Configuration.GetConnectionString("GoalSvcConnection")));
var app = builder.Build();


app.UseHttpsRedirection();

app.Run();
