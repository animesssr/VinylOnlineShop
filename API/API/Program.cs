using API;
using API.db;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Basic", new OpenApiSecurityScheme
    {
        Description = "Введите логин и пароль",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Basic"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Basic"
                }
            },
            new List<string>()
        }
    });
});
builder.Services.AddAuthentication("Basic")
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("Basic", options => { });
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser().Build();
});

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ящик Винила API");
});

app.MapGet("/", () => "Hello World!").AllowAnonymous();

app.MapPost( "/login",
async (context) =>
{
    var formData = await context.Request.ReadFormAsync();

    var login = formData["login"].ToString();
    var password = formData["password"].ToString();

    var contextUser = new MydbContext();

    User user = contextUser.Users.FirstOrDefault(x => x.Email == login);

    if (user != null && password == user.Password)
    {
        context.Response.StatusCode = 200;
        await context.Response.WriteAsJsonAsync(user);
    }
    else
        context.Response.StatusCode = 401;
})
.AllowAnonymous();

app.MapGet("/user/{id:int}", (int id) =>
{
    using (var context = new MydbContext())
    {
        var userWithOrders = context.Users
            .Include(u => u.Orders)
                .ThenInclude(o => o.OrderItems)
                    .ThenInclude(oi => oi.ItemVinyl)
            .Include(u => u.Adresses)
            .FirstOrDefault(u => u.IdUsers == id);

        if (userWithOrders == null)
        {
            return Results.NotFound();
        }

        return Results.Ok(userWithOrders);
    }
}).RequireAuthorization()
.WithTags("Пользователи")
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status200OK);

app.MapPost("/reg", (User postUser) =>
{
    using (var context = new MydbContext())
    {
        context.Add(postUser);
        context.SaveChanges();
        return context.Users.Find(postUser.IdUsers);
    }
})
.AllowAnonymous()
.WithTags("Пользователи")
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status200OK);

app.MapPut(
    "/user/{id:int}",
    (int id, User postUser) =>
    {
        using (var context = new MydbContext())
        {
            var user = context.Users.Find(id);
            if (user == null)
                return Results.NotFound();

            user.Name = postUser.Name;
            user.Email = postUser.Email;
            user.PhoneNumber = postUser.PhoneNumber;

            context.Update(user);
            context.SaveChanges();
        }

        return Results.Ok();
    })
.RequireAuthorization()
.WithTags("Пользователи")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status404NotFound);

app.MapDelete(
    "/user/{id:int}",
    (int id) =>
    {
        using (var context = new MydbContext())
        {
            var user = context.Users.Find(id);
            if (user == null)
                return Results.NotFound();

            context.Users.Remove(user);
            context.SaveChanges();
        }

        return Results.Ok();
    }).RequireAuthorization()
.WithTags("Пользователи")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status404NotFound);

app.MapGet("/vinyl", () =>
{
    using (var context = new MydbContext())
    {
        return context.Vinyls.Include(u => u.Tracklists).ToList();
    }
})
.AllowAnonymous()
.WithTags("Пластинки")
.Produces<Vinyl[]>(StatusCodes.Status200OK);    

app.MapPost(
    "/vinyl",
    (Vinyl postVinyl) =>
    {
        using (var context = new MydbContext())
        {
            context.Add(postVinyl);
            context.SaveChanges();
        }
    }).RequireAuthorization()
.WithTags("Пластинки")
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status200OK);

app.MapPut(
    "/vinyl/{id:int}",
    (int id, Vinyl postVinyl) =>
    {
        using (var context = new MydbContext())
        {
            var vinyl = context.Vinyls.Find(id);
            if (vinyl == null)
                return Results.NotFound();

            vinyl.Name = postVinyl.Name;
            vinyl.Artist = postVinyl.Artist;

            // ...

            context.Update(vinyl);
            context.SaveChanges();
        }

        return Results.Ok();
    })
.AllowAnonymous()
.WithTags("Пластинки")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status404NotFound);

app.MapDelete(
    "/vinyl/{id:int}",
    (int id) =>
    {
        using (var context = new MydbContext())
        {
            var vinyl = context.Vinyls.Find(id);
            if (vinyl == null)
                return Results.NotFound();

            context.Vinyls.Remove(vinyl);
            context.SaveChanges();
        }

        return Results.Ok();
    }).RequireAuthorization()
.WithTags("Пластинки")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status404NotFound);

app.MapGet("/orders", () =>
{
    using (var context = new MydbContext())
    {
        var orders = context.Orders.Include(o => o.OrderItems).ToList();

        return Results.Ok(orders);
    }
});

app.MapPost(
    "/order", (Order order) =>
    {
        using(var context = new MydbContext())
        {
            context.Add(order);
            context.SaveChanges();
            return Results.Ok(context.Orders.Find(order.IdOrders));
        }
    })
.RequireAuthorization()
.WithTags("Заказы")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status404NotFound);

app.MapPost(
    "/order/{id:int}/item", (int id, OrderItem orderitem) =>
    {
        using (var context = new MydbContext())
        {
            context.Add(orderitem);
            context.SaveChanges();
        }
    })
.RequireAuthorization()
.WithTags("Заказы")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status401Unauthorized)
.Produces(StatusCodes.Status404NotFound);

app.Run();
