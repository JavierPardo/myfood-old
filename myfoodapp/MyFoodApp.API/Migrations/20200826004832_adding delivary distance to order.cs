using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class addingdelivarydistancetoorder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DeliveryDistanceKm",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DestinationLocationId",
                table: "Events",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryDistanceKm",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "DestinationLocationId",
                table: "Events");
        }
    }
}
