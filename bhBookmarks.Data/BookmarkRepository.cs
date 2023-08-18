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

        public void UpdateBookmark(Bookmark bookmark)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Update(bookmark);
            context.SaveChanges();
        }

        public List<TopBookmark> TopFive()
        {
            using var ctx = new BookmarkDataContext(_connectionString);
            var topFive = ctx.Bookmarks.Select(b => b.Url).ToHashSet().
                Select(u =>
                {
                    return new TopBookmark
                    {
                        Url = u,
                        Count = ctx.Bookmarks.Count(b => b.Url == u)
                    };
                });
            return topFive.OrderByDescending(b => b.Count).Take(5).ToList();
        }


    }
}
