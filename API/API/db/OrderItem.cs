using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.db;

public partial class OrderItem
{
    public int IdorderItem { get; set; }

    public int Orderid { get; set; }

    public int ItemVinylid { get; set; }

    [ForeignKey("ItemVinylid")]
    public Vinyl ItemVinyl { get; set; }
}
