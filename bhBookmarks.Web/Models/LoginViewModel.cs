using bhBookmarks.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bhBookmarks.Web.Models
{
    public class LoginViewModel : User
    {
        public string Password { get; set; }
    }
}
