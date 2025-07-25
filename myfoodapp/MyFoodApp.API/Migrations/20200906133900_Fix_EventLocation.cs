using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Fix_EventLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<long>(
                name: "DestinationLocationId",
                table: "Events",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events",
                column: "DestinationLocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Locations_DestinationLocationId",
                table: "Events",
                column: "DestinationLocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Locations_DestinationLocationId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events");

            migrationBuilder.AlterColumn<int>(
                name: "DestinationLocationId",
                table: "Events",
                type: "integer",
                nullable: true,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DestinationLocationId1",
                table: "Events",
                type: "bigint",
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
    }
}
