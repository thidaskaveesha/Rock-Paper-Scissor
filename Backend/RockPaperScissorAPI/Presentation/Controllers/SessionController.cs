using Microsoft.AspNetCore.Mvc;
using RockPaperScissorAPI.Application.Interfaces;

namespace RockPaperScissorAPI.Presentation.Controllers
{
    [ApiController]
    [Route("api/session")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionService _sessionService;

        public SessionController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpPost("create")]
        public IActionResult CreateSession()
        {
            var session = _sessionService.CreateSession();
            return Ok(session);
        }

        [HttpPost("join/{sessionId}/{playerId}")]
        public IActionResult JoinSession(string sessionId, string playerId)
        {
            try
            {
                var session = _sessionService.JoinSession(sessionId, playerId);
                return Ok(session);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("terminate/{sessionId}")]
        public IActionResult TerminateSession(string sessionId)
        {
            try
            {
                _sessionService.TerminateSession(sessionId);
                return Ok("Session terminated.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
