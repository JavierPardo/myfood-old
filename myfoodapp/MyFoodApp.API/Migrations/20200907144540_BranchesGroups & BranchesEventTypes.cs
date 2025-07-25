using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class BranchesGroupsBranchesEventTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BranchesEventTypes",
                columns: table => new
                {
                    BranchId = table.Column<int>(nullable: false),
                    EventTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchesEventTypes", x => new { x.BranchId, x.EventTypeId });
                    table.ForeignKey(
                        name: "FK_BranchesEventTypes_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BranchesEventTypes_EventType_EventTypeId",
                        column: x => x.EventTypeId,
                        principalTable: "EventType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "EventType",
                columns: new[] { "Id", "Deliverable", "Name" },
                values: new object[] { 4, false, "Reserva" });

            migrationBuilder.CreateIndex(
                name: "IX_BranchesEventTypes_EventTypeId",
                table: "BranchesEventTypes",
                column: "EventTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BranchesEventTypes");

            migrationBuilder.DeleteData(
                table: "EventType",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
