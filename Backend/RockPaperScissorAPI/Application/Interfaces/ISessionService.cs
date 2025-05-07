using RockPaperScissorAPI.Domain;

namespace RockPaperScissorAPI.Application.Interfaces
{
    public interface ISessionService
    {
        Session CreateSession();
        Session JoinSession(string sessionId, string playerId);
        void TerminateSession(string sessionId);
        Session GetSession(string sessionId);
    }
}
