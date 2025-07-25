using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Remove_OrderId_OrderItemSide : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_OrderItemSelectedSides_OrderItem_OrderId",
            //    table: "OrderItemSelectedSides");

            migrationBuilder.DropIndex(
                name: "IX_OrderItemSelectedSides_OrderId",
                table: "OrderItemSelectedSides");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "OrderItemSelectedSides");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemSelectedSides_OrderItemId",
                table: "OrderItemSelectedSides",
                column: "OrderItemId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_OrderItemSelectedSides_OrderItem_OrderItemId",
            //    table: "OrderItemSelectedSides",
            //    column: "OrderItemId",
            //    principalTable: "OrderItem",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_OrderItemSelectedSides_OrderItem_OrderItemId",
            //    table: "OrderItemSelectedSides");

            migrationBuilder.DropIndex(
                name: "IX_OrderItemSelectedSides_OrderItemId",
                table: "OrderItemSelectedSides");

            migrationBuilder.AddColumn<long>(
                name: "OrderId",
                table: "OrderItemSelectedSides",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemSelectedSides_OrderId",
                table: "OrderItemSelectedSides",
                column: "OrderId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_OrderItemSelectedSides_OrderItem_OrderId",
            //    table: "OrderItemSelectedSides",
            //    column: "OrderId",
            //    principalTable: "OrderItem",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }
    }
}
