using RockPaperScissorAPI.Infrastructure.Data;
using RockPaperScissorAPI.Application.Interfaces;
using RockPaperScissorAPI.Domain;
using System.Collections.Concurrent;

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

        public Session ProcessChoice(string sessionId, string playerId, string choice)
        {
            var session = GetSession(sessionId);

            lock (session)
            {
                if (session.GameState != GameState.InProgress)
                    throw new InvalidOperationException("Game is not in progress.");

                session.PlayerChoices[playerId] = choice;

                if (session.PlayerChoices.Count == Session.MaxPlayers)
                {
                    // Determine winner
                    string player1Id = session.PlayerChoices.Keys.First();
                    string player2Id = session.PlayerChoices.Keys.Last();
                    string player1Choice = session.PlayerChoices[player1Id];
                    string player2Choice = session.PlayerChoices[player2Id];

                    string roundResult = DetermineRoundWinner(player1Choice, player2Choice);

                    if (roundResult == "Player1")
                        session.PlayerScores[player1Id]++;
                    else if (roundResult == "Player2")
                        session.PlayerScores[player2Id]++;

                    // Check for game over
                    if (session.PlayerScores[player1Id] >= Session.RoundsToWin || session.PlayerScores[player2Id] >= Session.RoundsToWin)
                    {
                        session.GameState = GameState.GameOver;
                    }
                    else
                    {
                        session.GameState = GameState.RoundEnded;
                        session.RoundNumber++;
                    }

                    // Reset choices for next round
                    session.PlayerChoices.Clear();
                }
                _context.SaveChanges();
            }

            return session;
        }
        private string DetermineRoundWinner(string player1Choice, string player2Choice)
        {
            if (player1Choice == player2Choice)
            {
                return "Draw";
            }

            if ((player1Choice == "Rock" && player2Choice == "Scissors") ||
                (player1Choice == "Paper" && player2Choice == "Rock") ||
                (player1Choice == "Scissors" && player2Choice == "Paper"))
            {
                return "Player1";
            }

            return "Player2";
        }
        public void StartGame(string sessionId)
        {
            var session = GetSession(sessionId);
            session.GameState = GameState.InProgress;
            session.PlayerScores.Clear();
            foreach (var user in session.Users)
            {
                session.PlayerScores.TryAdd(user, 0);
            }
        }
        public Session GetGameState(string sessionId)
        {
            return GetSession(sessionId);
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
