using System;
using System.Collections.Generic;

namespace API.db;

public partial class User
{
    public int IdUsers { get; set; }

    public string Email { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? Name { get; set; }

    public string Password { get; set; } = null!;

    public virtual ICollection<Adress> Adresses { get; set; } = new List<Adress>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
