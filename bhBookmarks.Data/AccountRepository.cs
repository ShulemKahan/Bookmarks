using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bhBookmarks.Data
{
    public class AccountRepository
    {
        private readonly string _connectionString;

        public AccountRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Signup(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new BookmarkDataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }
            var isValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (isValid)
            {
                return user;
            }
            return null;
        }

        public User GetByEmail(string email)
        {
            using var ctx = new BookmarkDataContext(_connectionString);

            if (ctx.Users.FirstOrDefault(u => u.Email == email) == null)
            {
                return null;
            }

            return ctx.Users.FirstOrDefault(u => u.Email == email);

        }
    }
}
