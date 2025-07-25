using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class MovingbannerandlogotoClient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Banner",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Branches");

            migrationBuilder.AddColumn<string>(
                name: "BannerURL",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LogoURL",
                table: "Clients",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BannerURL",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "LogoURL",
                table: "Clients");

            migrationBuilder.AddColumn<byte[]>(
                name: "Banner",
                table: "Branches",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Logo",
                table: "Branches",
                type: "bytea",
                nullable: true);
        }
    }
}
