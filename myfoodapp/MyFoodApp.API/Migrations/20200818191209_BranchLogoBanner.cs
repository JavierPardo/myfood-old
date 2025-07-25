using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class BranchLogoBanner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Banner",
                table: "Branches",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Logo",
                table: "Branches",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Banner",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Branches");
        }
    }
}
