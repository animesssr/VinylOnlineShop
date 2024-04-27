using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AdminDB.mydb;

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

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Vinyl> Vinyls { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=127.0.0.1;database=mydb;uid=root;password=123123;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Adress>(entity =>
        {
            entity.HasKey(e => e.IdAdresses).HasName("PRIMARY");

            entity.ToTable("adresses");

            entity.HasIndex(e => e.IdAdresses, "id_adresses_UNIQUE").IsUnique();

            entity.Property(e => e.IdAdresses).HasColumnName("id_adresses");
            entity.Property(e => e.Adress1).HasColumnName("adress");
            entity.Property(e => e.Index)
                .HasMaxLength(45)
                .HasColumnName("index");
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
            entity.Property(e => e.Edition)
                .HasMaxLength(45)
                .HasColumnName("edition");
            entity.Property(e => e.Genre)
                .HasMaxLength(100)
                .HasColumnName("genre");
            entity.Property(e => e.IdTracklist)
                .HasMaxLength(45)
                .HasColumnName("id_tracklist");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.ReleaseId).HasColumnName("release_id");
            entity.Property(e => e.Year).HasColumnName("year");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
