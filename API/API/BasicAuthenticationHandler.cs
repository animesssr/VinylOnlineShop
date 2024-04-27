using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using MySqlX.XDevAPI;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text;
using API.db;

namespace API
{
    public class BasicAuthenticationHandler :
    AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public BasicAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock) : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
                return Task.FromResult(
                    AuthenticateResult.Fail(
                        "Missing Authorization header"));

            try
            {
                var authorizationHeader = Request
                    .Headers["Authorization"].ToString();

                // в релизе можно вырезать
                Console.WriteLine(
                    $"authorizationHeader = {authorizationHeader}");

                var base64EncodedUsernamePassword = authorizationHeader
                    .Split(' ')[1];

                Console.WriteLine(
                    $"base64EncodedUsernamePassword = {base64EncodedUsernamePassword}");

                var usernamePasswordString = Encoding.UTF8.GetString(
                    Convert.FromBase64String(base64EncodedUsernamePassword));

                Console.WriteLine(
                    $"usernamePasswordString = {usernamePasswordString}");

                var usernamePasswordArr = usernamePasswordString.Split(':');

                var context = new MydbContext();

                User user = context.Users.FirstOrDefault(x => x.Email == usernamePasswordArr[0]);

                if (
                        user != null &&
                        usernamePasswordArr[1] == user.Password)
                    {
                        var claims = new[] {
                    new Claim(
                        ClaimTypes.NameIdentifier,
                        usernamePasswordArr[0]),
                    new Claim(
                        ClaimTypes.Name,
                        usernamePasswordArr[0])
                };

                        var identity = new ClaimsIdentity(
                            claims, Scheme.Name);

                        var principal = new ClaimsPrincipal(identity);

                        var ticket = new AuthenticationTicket(
                            principal, Scheme.Name);

                        return Task.FromResult(
                            AuthenticateResult.Success(ticket));
                    }

                return Task.FromResult(
                    AuthenticateResult.Fail("Invalid username or password"));
            }
            catch
            {
                return Task.FromResult(
                    AuthenticateResult.Fail("Invalid Authorization header"));
            }
        }
    }
}
