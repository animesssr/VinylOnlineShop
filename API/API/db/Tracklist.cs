using System;
using System.Collections.Generic;

namespace API.db;

public partial class Tracklist
{
    public int IdTracklists { get; set; }

    public int Vinylid { get; set; }

    public string Tracks { get; set; } = null!;

}
