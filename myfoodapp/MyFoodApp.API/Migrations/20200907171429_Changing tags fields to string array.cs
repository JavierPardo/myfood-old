using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Changingtagsfieldstostringarray : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        { //MANUAL MIGRATION. Drop and Add fields as there's no direct cast between JsbonB and string[]. Loss of data may occurr.

            migrationBuilder.DropColumn(
              name: "Tags",
              table: "Branches");

            migrationBuilder.DropColumn(
              name: "Preferences",
              table: "AspNetUsers");

            migrationBuilder.AddColumn<string[]>(
               name: "Tags",
               table: "Branches",
               nullable: true);

            migrationBuilder.AddColumn<string[]>(
               name: "Preferences",
               table: "AspNetUsers",
               nullable: true);
          
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
            name: "Tags",
            table: "Branches");

            migrationBuilder.DropColumn(
              name: "Preferences",
              table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
              name: "Tags",
              table: "Branches",
              type: "jsonb",
              nullable: true);

            migrationBuilder.AddColumn<string>(
               name: "Preferences",
               table: "AspNetUsers",
               type: "jsonb",
               nullable: true);
        }
    }
}
