using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminDB
{
    internal class Globals
    {
        public static string? token = null;

        public static bool isAuth() => token != null;

        public static void createToken(string login, string password)
        {
            token = Convert.ToBase64String(
                ASCIIEncoding.ASCII.GetBytes($"{login}:{password}"));
        }
    }
}
