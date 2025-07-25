using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_Detail_Order : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderDateTime",
                table: "Orders");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateOrderDateTime",
                table: "Orders",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Orders",
                type: "jsonb",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateOrderDateTime",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Orders");

            migrationBuilder.AddColumn<DateTime>(
                name: "OrderDateTime",
                table: "Orders",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
