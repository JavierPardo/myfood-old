using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class addingzonesentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Branches",
                newName: "Coordinates");

            migrationBuilder.AddColumn<int>(
                name: "ZoneId",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Cities",
                nullable: false,
                defaultValue: 26);

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Branches",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Branches",
                nullable: false,
                defaultValue: 26);

            migrationBuilder.AddColumn<int>(
                name: "ZoneId",
                table: "Branches",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Zone",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ZoneName = table.Column<string>(nullable: true),
                    Coordinates = table.Column<string>(nullable: true),
                    CityId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zone", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zone_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Locations_ZoneId",
                table: "Locations",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CountryId",
                table: "Cities",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_CityId",
                table: "Branches",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_CountryId",
                table: "Branches",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_ZoneId",
                table: "Branches",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Zone_CityId",
                table: "Zone",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_Cities_CityId",
                table: "Branches",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_Countries_CountryId",
                table: "Branches",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_Zone_ZoneId",
                table: "Branches",
                column: "ZoneId",
                principalTable: "Zone",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Countries_CountryId",
                table: "Cities",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Zone_ZoneId",
                table: "Locations",
                column: "ZoneId",
                principalTable: "Zone",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branches_Cities_CityId",
                table: "Branches");

            migrationBuilder.DropForeignKey(
                name: "FK_Branches_Countries_CountryId",
                table: "Branches");

            migrationBuilder.DropForeignKey(
                name: "FK_Branches_Zone_ZoneId",
                table: "Branches");

            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Countries_CountryId",
                table: "Cities");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Zone_ZoneId",
                table: "Locations");

            migrationBuilder.DropTable(
                name: "Zone");

            migrationBuilder.DropIndex(
                name: "IX_Locations_ZoneId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Cities_CountryId",
                table: "Cities");

            migrationBuilder.DropIndex(
                name: "IX_Branches_CityId",
                table: "Branches");

            migrationBuilder.DropIndex(
                name: "IX_Branches_CountryId",
                table: "Branches");

            migrationBuilder.DropIndex(
                name: "IX_Branches_ZoneId",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "Branches");

            migrationBuilder.RenameColumn(
                name: "Coordinates",
                table: "Branches",
                newName: "Location");
        }
    }
}
