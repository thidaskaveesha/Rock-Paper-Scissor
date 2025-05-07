namespace RockPaperScissorAPI.Domain
{
    public class Session
    {
        public string SessionId { get; set; } = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();
        public List<string> Users { get; set; } = new List<string>();
        public bool IsActive { get; set; } = true;
    }
}
