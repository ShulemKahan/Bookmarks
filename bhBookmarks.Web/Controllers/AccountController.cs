using bhBookmarks.Data;
using bhBookmarks.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace bhBookmarks.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private string _connectionString;

        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("signup")]
        public void Signup(LoginViewModel user)
        {
            var repo = new AccountRepository(_connectionString);
            repo.Signup(user, user.Password);
        }

        [HttpGet]
        [Route("login")]
        public User Login(string email, string password)
        {
            var repo = new AccountRepository(_connectionString);
            var user = repo.Login(email, password);
            if (user == null)
            {
                return null;
            }
            var claims = new List<Claim>()
            {
                new Claim("user", email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();
            return user;
        }

        [HttpGet]
        [Route("updateuser")]
        public User UpdateUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new AccountRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }

    }
}
