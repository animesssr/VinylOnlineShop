using System;
using System.Collections.Generic;

namespace AdminDB.mydb;

public partial class User
{
    public int IdUsers { get; set; }

    public string Email { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? Name { get; set; }

    public string Password { get; set; } = null!;
}
