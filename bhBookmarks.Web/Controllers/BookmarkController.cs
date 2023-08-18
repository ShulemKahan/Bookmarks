using bhBookmarks.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bhBookmarks.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Authorize]
        [Route("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var accountRepo = new AccountRepository(_connectionString);
            bookmark.UserId = accountRepo.GetByEmail(User.Identity.Name).Id;
            var repo = new BookmarkRepository(_connectionString);
            repo.AddBookmark(bookmark);
        }

        [HttpGet]
        [Authorize]
        [Route("getbookmarksbyid")]
        public List<Bookmark> GetBookmarksById()
        {
            var accountRepo = new AccountRepository(_connectionString);
            var userId = accountRepo.GetByEmail(User.Identity.Name).Id;
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetBookmarksById(userId);
        }


        [HttpPost]
        [Authorize]
        [Route("deletebookmark")]
        public void DeleteBookmark(Bookmark bookmark)
        {
            var accountRepo = new AccountRepository(_connectionString);
            bookmark.UserId = accountRepo.GetByEmail(User.Identity.Name).Id;
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(bookmark);
        }
    }
}
