using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class Pointsentities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PointsExchange",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    RequiredPoints = table.Column<int>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointsExchange", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPointsTransaction",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    TransactionType = table.Column<int>(nullable: false),
                    Points = table.Column<int>(nullable: false),
                    Action = table.Column<int>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    PointEventId = table.Column<long>(nullable: true),
                    PointsExchangeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPointsTransaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPointsTransaction_PointsExchange_PointsExchangeId",
                        column: x => x.PointsExchangeId,
                        principalTable: "PointsExchange",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserPointsTransaction_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemPriceHistory_AdminUserId",
                table: "ItemPriceHistory",
                column: "AdminUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPointsTransaction_PointsExchangeId",
                table: "UserPointsTransaction",
                column: "PointsExchangeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPointsTransaction_UserId",
                table: "UserPointsTransaction",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemPriceHistory_AspNetUsers_AdminUserId",
                table: "ItemPriceHistory",
                column: "AdminUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemPriceHistory_AspNetUsers_AdminUserId",
                table: "ItemPriceHistory");

            migrationBuilder.DropTable(
                name: "UserPointsTransaction");

            migrationBuilder.DropTable(
                name: "PointsExchange");

            migrationBuilder.DropIndex(
                name: "IX_ItemPriceHistory_AdminUserId",
                table: "ItemPriceHistory");
        }
    }
}
