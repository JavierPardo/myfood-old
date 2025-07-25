using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Migrations.DataInitializer
{
    public static class UserAndRoleDataInitializer
    {
        public static void SeedData(UserManager<User> userManager, RoleManager<IdentityRole<long>> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        private static void SeedUsers(UserManager<User> userManager)
        {
            if (userManager.FindByEmailAsync("contacto@myfoodapp.com.bo").Result == null)
            {
                User user = new User();
                user.UserName = "contacto@myfoodapp.com.bo";
                user.Email = "contacto@myfoodapp.com.bo";
                user.FirstName = "Super";
                user.LastName = "Admin";

                IdentityResult result = userManager.CreateAsync(user, "P@ssw0rd1!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Super Admin").Wait();
                }
            }


            if (userManager.FindByEmailAsync("test@myfoodapp.com.bo").Result == null)
            {
                User user = new User();
                user.UserName = "test@myfoodapp.com.bo";
                user.Email = "test@myfoodapp.com.bo";
                user.FirstName = "Test";
                user.LastName = "User";

                IdentityResult result = userManager.CreateAsync(user, "P@ssw0rd1!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }

            if (userManager.FindByEmailAsync("employee@myfoodapp.com.bo").Result == null)
            {
                User user = new User();
                user.UserName = "employee@myfoodapp.com.bo";
                user.Email = "employee@myfoodapp.com.bo";
                user.FirstName = "Test";
                user.LastName = "Employee";

                IdentityResult result = userManager.CreateAsync(user, "P@ssw0rd1!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Employee").Wait();
                }
            }

            if (userManager.FindByEmailAsync("accounting@myfoodapp.com.bo").Result == null)
            {
                User user = new User();
                user.UserName = "accounting@myfoodapp.com.bo";
                user.Email = "accounting@myfoodapp.com.bo";
                user.FirstName = "Test";
                user.LastName = "Accounting";

                IdentityResult result = userManager.CreateAsync(user, "P@ssw0rd1!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Accounting").Wait();
                }
            }

            if (userManager.FindByEmailAsync("admin@myfoodapp.com.bo").Result == null)
            {
                User user = new User();
                user.UserName = "admin@myfoodapp.com.bo";
                user.Email = "admin@myfoodapp.com.bo";
                user.FirstName = "Test";
                user.LastName = "Admin";

                IdentityResult result = userManager.CreateAsync(user, "P@ssw0rd1!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }
        }

        private static void SeedRoles(RoleManager<IdentityRole<long>> roleManager)
        {
            if (!roleManager.RoleExistsAsync("User").Result)
            {
                IdentityRole<long> role = new IdentityRole<long>();
                role.Name = "User";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }


            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                IdentityRole<long> role = new IdentityRole<long>();
                role.Name = "Admin";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Employee").Result)
            {
                IdentityRole<long> role = new IdentityRole<long>();
                role.Name = "Employee";
                IdentityResult roleResult = roleManager.
                    CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Accounting").Result)
            {
                IdentityRole<long> role = new IdentityRole<long>();
                role.Name = "Accounting";
                IdentityResult roleResult = roleManager.
                    CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Super Admin").Result)
            {
                IdentityRole<long> role = new IdentityRole<long>();
                role.Name = "Super Admin";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
    }
}
