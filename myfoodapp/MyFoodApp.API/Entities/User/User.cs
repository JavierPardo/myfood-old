using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Enum;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyFoodApp.API.Entities
{
    public class User : IdentityUser<long>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime? LastUserLogin { get; set; }
        public DateTime DOB { get; set; }
        public GenderEnum Gender { get; set; }
        public List<string> Preferences { get; set; }  //preferencias del usuario (tags) que corresponden a los tags de los branches
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<UserNotification> AppUserNotifications { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<OrderStatusHistory> OrderStatusHistories { get; set; }
        public virtual ICollection<ClientsAdminUsers> ClientsAdminUsers { get; set; }
        public virtual ICollection<UserPointsTransaction> UserPointTransactions { get; set; }

    }

    public class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {         
            builder.HasMany(e => e.Locations)
               .WithOne(e => e.User)
               .HasForeignKey(e => e.UserId);        
            builder.HasMany(e => e.Favorites)
               .WithOne(e => e.User)
               .HasForeignKey(e => e.UserId);
            builder.HasMany(e => e.AppUserNotifications)
               .WithOne(e => e.User)
               .HasForeignKey(e => e.UserId);
            builder.HasMany(e => e.UserPointTransactions)
               .WithOne(e => e.User)
               .HasForeignKey(e => e.UserId);
            builder.HasMany(e => e.Events)
                .WithOne(e => e.AppUser)
                .HasForeignKey(e => e.AppUserId);
        }
    }
}