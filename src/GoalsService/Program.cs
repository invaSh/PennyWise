using GoalsService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddControllers();

builder.Services.AddDbContext<GoalDbContext>
    (o => o.UseNpgsql(builder.Configuration.GetConnectionString("GoalSvcConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();


app.UseHttpsRedirection();

app.MapControllers();

app.Run();
