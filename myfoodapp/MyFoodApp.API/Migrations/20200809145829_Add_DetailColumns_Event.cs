using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_DetailColumns_Event : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "CustomerId",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Events",
                type: "jsonb",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Events");

            migrationBuilder.AddColumn<string>(
                name: "CustomerId",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Orders",
                type: "jsonb",
                nullable: true);
        }
    }
}
