using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class addOptionChoicetoOrderItemSelectedOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemsSides");

            migrationBuilder.DropIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "Locations");

            migrationBuilder.AddColumn<string>(
                name: "OptionChoice",
                table: "OrderItemSelectedOptions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events",
                column: "DestinationLocationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "OptionChoice",
                table: "OrderItemSelectedOptions");

            migrationBuilder.AddColumn<long>(
                name: "EventId",
                table: "Locations",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ItemsSides",
                columns: table => new
                {
                    ItemId = table.Column<long>(type: "bigint", nullable: false),
                    SideId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsSides", x => new { x.ItemId, x.SideId });
                    table.ForeignKey(
                        name: "FK_ItemsSides_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemsSides_Sides_SideId",
                        column: x => x.SideId,
                        principalTable: "Sides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_DestinationLocationId",
                table: "Events",
                column: "DestinationLocationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ItemsSides_SideId",
                table: "ItemsSides",
                column: "SideId");
        }
    }
}
