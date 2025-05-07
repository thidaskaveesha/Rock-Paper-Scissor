using Microsoft.EntityFrameworkCore;
using RockPaperScissorAPI.Application.Interfaces;
using RockPaperScissorAPI.Application.Services;
using RockPaperScissorAPI.Infrastructure.Data;
using RockPaperScissorAPI.Infrastructure.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add controllers
builder.Services.AddControllers();

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add SignalR
builder.Services.AddSignalR();

// Configure in-memory database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("RockPaperScissorsDB"));

// Add session service
builder.Services.AddScoped<ISessionService, SessionService>();

// Configure CORS for the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Replace with your frontend's URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS
app.UseCors("AllowFrontend");

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Use Authorization middleware
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Map SignalR hubs
app.MapHub<GameHub>("/gamehub");

app.Run();
