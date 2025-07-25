using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class LocationIconIndexandUserPreferences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IconIndex",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Preferences",
                table: "AspNetUsers",
                type: "jsonb",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IconIndex",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Preferences",
                table: "AspNetUsers");
        }
    }
}
