using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Fix_Location_For_Event : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events");

            migrationBuilder.AddColumn<long>(
                name: "EventId",
                table: "Locations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events",
                column: "DestinationLocationId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "Locations");

            migrationBuilder.CreateIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events",
                column: "DestinationLocationId");
        }
    }
}
