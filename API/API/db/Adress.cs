using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.db;

public partial class Adress
{
    public int IdAdresses { get; set; }

    public string Index { get; set; } = null!;

    public string Adress1 { get; set; } = null!;

    public int Iduser { get; set; }

    [JsonIgnore]

    public virtual User IduserNavigation { get; set; } = null!;
}
