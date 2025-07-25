using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Remove_ImageColumn_Group_ReservationSpecialEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "ReservationSpecialEvent");

            migrationBuilder.DropColumn(
                name: "Logo",
                table: "PaymentType");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Group");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "ReservationSpecialEvent",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Logo",
                table: "PaymentType",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Group",
                type: "bytea",
                nullable: true);
        }
    }
}
