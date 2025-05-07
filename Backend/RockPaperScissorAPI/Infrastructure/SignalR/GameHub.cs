using Microsoft.AspNetCore.SignalR;

namespace RockPaperScissorAPI.Infrastructure.SignalR;

public class GameHub : Hub
{
    public async Task JoinSession(string sessionId, string playerId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
        await Clients.Group(sessionId).SendAsync("PlayerJoined", playerId);
    }

    public async Task NotifySessionEnd(string sessionId)
    {
        await Clients.Group(sessionId).SendAsync("SessionEnded");
    }

    public async Task BroadcastChoice(string sessionId, string playerId, string choice)
    {
        await Clients.Group(sessionId).SendAsync("ReceiveChoice", playerId, choice);
    }
}
