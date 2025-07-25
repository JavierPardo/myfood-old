using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class AddBranchNotificationstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BranchNotificationType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchNotificationType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BranchNotification",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<int>(nullable: false),
                    NotificationTypeId = table.Column<int>(nullable: false),
                    EventId = table.Column<long>(nullable: false),
                    SentDateTime = table.Column<DateTime>(nullable: false),
                    Read = table.Column<bool>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    BranchNotificationTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchNotification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BranchNotification_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BranchNotification_BranchNotificationType_BranchNotificatio~",
                        column: x => x.BranchNotificationTypeId,
                        principalTable: "BranchNotificationType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BranchNotification_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BranchNotificationType",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Llamar Camarero" });

            migrationBuilder.CreateIndex(
                name: "IX_BranchNotification_BranchId",
                table: "BranchNotification",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_BranchNotification_BranchNotificationTypeId",
                table: "BranchNotification",
                column: "BranchNotificationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BranchNotification_EventId",
                table: "BranchNotification",
                column: "EventId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BranchNotification");

            migrationBuilder.DropTable(
                name: "BranchNotificationType");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Orders");
        }
    }
}
