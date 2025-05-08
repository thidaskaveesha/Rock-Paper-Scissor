using Microsoft.AspNetCore.SignalR;
using RockPaperScissorAPI.Application.Interfaces;
using RockPaperScissorAPI.Domain;

using Microsoft.AspNetCore.SignalR;

namespace RockPaperScissorAPI.Infrastructure.SignalR;

public class GameHub : Hub
{
    private readonly ISessionService _sessionService;

    public GameHub(ISessionService sessionService)
    {
        _sessionService = sessionService;
    }
    public async Task GetInitialGameState(string sessionId)
    {
        var gameState = _sessionService.GetGameState(sessionId);
        await Clients.Caller.SendAsync("GameStateUpdated", gameState);
    }


    public async Task JoinSession(string sessionId, string playerId) 
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
        await Clients.Group(sessionId).SendAsync("PlayerJoined", playerId);
        var session = _sessionService.GetSession(sessionId);
        if (session.Users.Count == Session.MaxPlayers)
        {
            _sessionService.StartGame(sessionId);
            var gameState = _sessionService.GetGameState(sessionId);
            await Clients.Group(sessionId).SendAsync("GameStateUpdated", gameState);
        }
    }

    public async Task NotifySessionEnd(string sessionId)
    {
        await Clients.Group(sessionId).SendAsync("SessionEnded");
    }
    public async Task BroadcastChoice(string sessionId, string playerId, string choice)
    {
        _sessionService.ProcessChoice(sessionId, playerId, choice);
        var gameState = _sessionService.GetGameState(sessionId);
        await Clients.Group(sessionId).SendAsync("GameStateUpdated", gameState);
    }


}
