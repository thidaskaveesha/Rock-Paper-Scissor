using RockPaperScissorAPI.Infrastructure.Data;
using RockPaperScissorAPI.Application.Interfaces;
using RockPaperScissorAPI.Domain;

namespace RockPaperScissorAPI.Application.Services
{
    public class SessionService : ISessionService
    {
        private readonly AppDbContext _context;

        public SessionService(AppDbContext context)
        {
            _context = context;
        }

        public Session CreateSession()
        {
            var session = new Session();
            _context.Sessions.Add(session);
            _context.SaveChanges();
            return session;
        }

        public Session JoinSession(string sessionId, string playerId)
        {
            var session = _context.Sessions.FirstOrDefault(s => s.SessionId == sessionId);

            if (session == null || !session.IsActive)
                throw new Exception("Session not found or inactive.");

            session.Users.Add(playerId);
            _context.SaveChanges();
            return session;
        }

        public void TerminateSession(string sessionId)
        {
            var session = _context.Sessions.FirstOrDefault(s => s.SessionId == sessionId);

            if (session == null)
                throw new Exception("Session not found.");

            session.IsActive = false;
            _context.SaveChanges();
        }

        public Session GetSession(string sessionId)
        {
            var session = _context.Sessions.FirstOrDefault(s => s.SessionId == sessionId);
            if (session == null)
                throw new Exception("Session not found.");

            return session;
        }
    }

}
