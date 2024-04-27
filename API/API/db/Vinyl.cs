using System;
using System.Collections.Generic;

namespace API.db;

public partial class Vinyl
{
    public int IdVinyls { get; set; }

    public string Name { get; set; } = null!;

    public string Artist { get; set; } = null!;

    public int Year { get; set; }

    public string Genre { get; set; } = null!;

    public int Cost { get; set; }

    public string Edition { get; set; } = null!;

    public string Cover { get; set; } = null!;

    public string Status { get; set; } = null!;

    public virtual ICollection<Tracklist> Tracklists { get; set; } = new List<Tracklist>();
}
