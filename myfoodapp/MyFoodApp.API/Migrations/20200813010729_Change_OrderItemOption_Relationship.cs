using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Change_OrderItemOption_Relationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemSelectedOptions_OrderItem_OrderId",
                table: "OrderItemSelectedOptions");

            migrationBuilder.DropIndex(
                name: "IX_OrderItemSelectedOptions_OrderId",
                table: "OrderItemSelectedOptions");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "OrderItemSelectedOptions");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "OrderItemSelectedOptions");

            migrationBuilder.AddColumn<long>(
                name: "OrderItemId",
                table: "OrderItemSelectedOptions",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemSelectedOptions_OrderItemId",
                table: "OrderItemSelectedOptions",
                column: "OrderItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemSelectedOptions_OrderItem_OrderItemId",
                table: "OrderItemSelectedOptions",
                column: "OrderItemId",
                principalTable: "OrderItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemSelectedOptions_OrderItem_OrderItemId",
                table: "OrderItemSelectedOptions");

            migrationBuilder.DropIndex(
                name: "IX_OrderItemSelectedOptions_OrderItemId",
                table: "OrderItemSelectedOptions");

            migrationBuilder.DropColumn(
                name: "OrderItemId",
                table: "OrderItemSelectedOptions");

            migrationBuilder.AddColumn<long>(
                name: "ItemId",
                table: "OrderItemSelectedOptions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "OrderId",
                table: "OrderItemSelectedOptions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemSelectedOptions_OrderId",
                table: "OrderItemSelectedOptions",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemSelectedOptions_OrderItem_OrderId",
                table: "OrderItemSelectedOptions",
                column: "OrderId",
                principalTable: "OrderItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
