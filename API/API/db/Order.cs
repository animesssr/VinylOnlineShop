using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.db;

public partial class Order
{
    public int IdOrders { get; set; }

    public int User { get; set; }

    public string Status { get; set; } = null!;

    public int Cost { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string PaymentStatus { get; set; } = null!;

    public string ShipMethod { get; set; } = null!;

    public string Adress { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    [JsonIgnore]

    public virtual User UserNavigation { get; set; } = null!;
}
