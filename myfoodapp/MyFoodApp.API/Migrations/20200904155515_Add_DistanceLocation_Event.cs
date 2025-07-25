using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_DistanceLocation_Event : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DestinationLocationId1",
                table: "Events",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_DestinationLocationId1",
                table: "Events",
                column: "DestinationLocationId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Locations_DestinationLocationId1",
                table: "Events",
                column: "DestinationLocationId1",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Locations_DestinationLocationId1",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_DestinationLocationId1",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "DestinationLocationId1",
                table: "Events");
        }
    }
}
