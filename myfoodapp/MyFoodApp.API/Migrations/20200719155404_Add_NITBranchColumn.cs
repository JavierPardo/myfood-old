using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_NITBranchColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Branches");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Branches",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Branches",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NIT",
                table: "Branches",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "NIT",
                table: "Branches");

            migrationBuilder.AlterColumn<int>(
                name: "Name",
                table: "Branches",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Branches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Branches",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
