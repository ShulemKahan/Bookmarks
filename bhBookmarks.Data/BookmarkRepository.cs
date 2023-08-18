using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bhBookmarks.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public List<Bookmark> GetBookmarksById(int id)
        {
            using var context = new BookmarkDataContext(_connectionString);
           return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }

        public void DeleteBookmark(Bookmark bookmark)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Remove(bookmark);
            context.SaveChanges();
        }



    }
}
