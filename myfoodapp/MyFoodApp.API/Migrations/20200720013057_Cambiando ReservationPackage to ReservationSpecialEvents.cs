using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class CambiandoReservationPackagetoReservationSpecialEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientsGroups");

            migrationBuilder.DropTable(
                name: "ReservationPackages");

            migrationBuilder.DropColumn(
                name: "ReservationPackageId",
                table: "Reservations");

            migrationBuilder.AddColumn<bool>(
                name: "isRead",
                table: "UserNotifications",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "ReservationSpecialEventId",
                table: "Reservations",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "BranchesGroups",
                columns: table => new
                {
                    BranchId = table.Column<int>(nullable: false),
                    GroupId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchesGroups", x => new { x.BranchId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_BranchesGroups_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BranchesGroups_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReservationSpecialEvent",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Image = table.Column<byte[]>(nullable: true),
                    CurrentPrice = table.Column<decimal>(nullable: false),
                    StartDateTime = table.Column<DateTime>(nullable: false),
                    EndDateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationSpecialEvent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservationSpecialEvent_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BranchesGroups_GroupId",
                table: "BranchesGroups",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationSpecialEvent_BranchId",
                table: "ReservationSpecialEvent",
                column: "BranchId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BranchesGroups");

            migrationBuilder.DropTable(
                name: "ReservationSpecialEvent");

            migrationBuilder.DropColumn(
                name: "isRead",
                table: "UserNotifications");

            migrationBuilder.DropColumn(
                name: "ReservationSpecialEventId",
                table: "Reservations");

            migrationBuilder.AddColumn<long>(
                name: "ReservationPackageId",
                table: "Reservations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "ClientsGroups",
                columns: table => new
                {
                    ClientId = table.Column<int>(type: "integer", nullable: false),
                    GroupId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsGroups", x => new { x.ClientId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_ClientsGroups_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientsGroups_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReservationPackages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<int>(type: "integer", nullable: false),
                    EndDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ItemId = table.Column<int>(type: "integer", nullable: true),
                    ItemdId = table.Column<int>(type: "integer", nullable: false),
                    ReservationTimeInterval = table.Column<int>(type: "integer", nullable: false),
                    StartDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
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
                name: "IX_ClientsGroups_GroupId",
                table: "ClientsGroups",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationPackages_BranchId",
                table: "ReservationPackages",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationPackages_ItemId",
                table: "ReservationPackages",
                column: "ItemId");
        }
    }
}
