using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API.db;

public partial class MydbContext : DbContext
{
    public MydbContext()
    {
    }

    public MydbContext(DbContextOptions<MydbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Adress> Adresses { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Tracklist> Tracklists { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Vinyl> Vinyls { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=127.0.0.1;database=mydb;uid=root;password=123123;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Adress>(entity =>
        {
            entity.HasKey(e => e.IdAdresses).HasName("PRIMARY");

            entity.ToTable("adresses");

            entity.HasIndex(e => e.IdAdresses, "id_adresses_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Iduser, "iduser_idx");

            entity.Property(e => e.IdAdresses).HasColumnName("id_adresses");
            entity.Property(e => e.Adress1).HasColumnName("adress");
            entity.Property(e => e.Iduser).HasColumnName("iduser");
            entity.Property(e => e.Index)
                .HasMaxLength(45)
                .HasColumnName("index");

            entity.HasOne(d => d.IduserNavigation).WithMany(p => p.Adresses)
                .HasForeignKey(d => d.Iduser)
                .HasConstraintName("iduser_fk");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.IdOrders).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.IdOrders, "id_orders_UNIQUE").IsUnique();

            entity.HasIndex(e => e.User, "userid_idx");

            entity.Property(e => e.IdOrders).HasColumnName("id_orders");
            entity.Property(e => e.Adress)
                .HasMaxLength(45)
                .HasColumnName("adress");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.PaymentMethod)
                .HasMaxLength(45)
                .HasColumnName("payment_method");
            entity.Property(e => e.PaymentStatus)
                .HasMaxLength(45)
                .HasColumnName("payment_status");
            entity.Property(e => e.ShipMethod)
                .HasMaxLength(45)
                .HasColumnName("ship_method");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");
            entity.Property(e => e.User).HasColumnName("user");

            entity.HasOne(d => d.UserNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.User)
                .HasConstraintName("userid");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.IdorderItem).HasName("PRIMARY");

            entity.ToTable("order_item");

            entity.HasIndex(e => e.Orderid, "order_idx");

            entity.HasIndex(e => e.Orderid, "order_item_idx");

            entity.HasIndex(e => e.Orderid, "orderitem_idx");

            entity.Property(e => e.IdorderItem).HasColumnName("idorder_item");
            entity.Property(e => e.ItemVinylid).HasColumnName("item_vinylid");
            entity.Property(e => e.Orderid).HasColumnName("orderid");

        });

        modelBuilder.Entity<Tracklist>(entity =>
        {
            entity.HasKey(e => e.IdTracklists).HasName("PRIMARY");

            entity.ToTable("tracklists");

            entity.HasIndex(e => e.Vinylid, "idvinyl_idx");

            entity.Property(e => e.IdTracklists).HasColumnName("id_tracklists");
            entity.Property(e => e.Tracks).HasColumnName("tracks");
            entity.Property(e => e.Vinylid).HasColumnName("vinylid");

        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.IdUsers).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.IdUsers, "id_users_UNIQUE").IsUnique();

            entity.Property(e => e.IdUsers).HasColumnName("id_users");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(45)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(45)
                .HasColumnName("phone_number");
        });

        modelBuilder.Entity<Vinyl>(entity =>
        {
            entity.HasKey(e => e.IdVinyls).HasName("PRIMARY");

            entity.ToTable("vinyls");

            entity.HasIndex(e => e.IdVinyls, "id_vinyls_UNIQUE").IsUnique();

            entity.Property(e => e.IdVinyls).HasColumnName("id_vinyls");
            entity.Property(e => e.Artist)
                .HasMaxLength(45)
                .HasColumnName("artist");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.Cover)
                .HasColumnType("mediumtext")
                .HasColumnName("cover");
            entity.Property(e => e.Edition)
                .HasMaxLength(45)
                .HasColumnName("edition");
            entity.Property(e => e.Genre)
                .HasMaxLength(100)
                .HasColumnName("genre");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");
            entity.Property(e => e.Year).HasColumnName("year");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
