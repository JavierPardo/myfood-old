using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class AddingScheduledOrderReadyClientOrderIdandTableNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientOrderId",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ScheduledOrderReady",
                table: "Orders",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TableNumber",
                table: "Events",
                nullable: true);

            migrationBuilder.InsertData(
                table: "TransactionStatus",
                columns: new[] { "Id", "Name" },
                values: new object[] { 6, "Conciliada" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TransactionStatus",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DropColumn(
                name: "ClientOrderId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ScheduledOrderReady",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TableNumber",
                table: "Events");
        }
    }
}
