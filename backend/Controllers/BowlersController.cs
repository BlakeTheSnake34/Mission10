using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BowlersController : ControllerBase
    {
        private readonly BowlingLeagueContext _context;

        public BowlersController(BowlingLeagueContext temp)
        {
            _context = temp;
        }

        [HttpGet]
        public IEnumerable<BowlerDto> Get()
        {
            return _context.Bowlers
                .Include(b => b.Team)
                .Where(b => b.Team.TeamName == "Marlins" || b.Team.TeamName == "Sharks")
                .Select(b => new BowlerDto
                {
                    BowlerFirstName = b.BowlerFirstName,
                    BowlerMiddleInit = b.BowlerMiddleInit,
                    BowlerLastName = b.BowlerLastName,
                    TeamName = b.Team.TeamName,
                    BowlerAddress = b.BowlerAddress,
                    BowlerCity = b.BowlerCity,
                    BowlerState = b.BowlerState,
                    BowlerZip = b.BowlerZip,
                    BowlerPhoneNumber = b.BowlerPhoneNumber
                })
                .ToList();
        }
    }
}