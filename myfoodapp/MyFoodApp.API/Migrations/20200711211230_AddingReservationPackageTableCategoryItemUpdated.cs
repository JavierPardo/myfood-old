using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class AddingReservationPackageTableCategoryItemUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Categories");

            migrationBuilder.AddColumn<bool>(
                name: "IsVisibleInMenu",
                table: "Items",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsVisibleInMenu",
                table: "Categories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "ReservationPackages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<int>(nullable: false),
                    ItemdId = table.Column<int>(nullable: false),
                    ItemId = table.Column<int>(nullable: true),
                    StartDateTime = table.Column<DateTime>(nullable: false),
                    EndDateTime = table.Column<DateTime>(nullable: false),
                    ReservationTimeInterval = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationPackages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservationPackages_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationPackages_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationPackages_BranchId",
                table: "ReservationPackages",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationPackages_ItemId",
                table: "ReservationPackages",
                column: "ItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationPackages");

            migrationBuilder.DropColumn(
                name: "IsVisibleInMenu",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "IsVisibleInMenu",
                table: "Categories");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Categories",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Categories",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
