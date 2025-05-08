using System.Collections.Generic;

namespace RockPaperScissorAPI.Domain
{
    public enum GameState
    {
        WaitingForPlayers,
        InProgress,
        RoundEnded,
        GameOver
    }

    public class Session
    {
        public const int MaxPlayers = 2;
        public const int RoundsToWin = 3;
        public string SessionId { get; set; } = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();
        public List<string> UserIds { get; set; } = new List<string>();
        public bool IsActive { get; set; } = true;
        public Dictionary<string, string> PlayerChoices { get; set; } = new Dictionary<string, string>(); // PlayerId -> Choice
        public Dictionary<string, int> PlayerScores { get; set; } = new Dictionary<string, int>(); // PlayerId -> Score
        public int CurrentRound { get; set; } = 1;
        public GameState State { get; set; } = GameState.WaitingForPlayers;
    }
}
