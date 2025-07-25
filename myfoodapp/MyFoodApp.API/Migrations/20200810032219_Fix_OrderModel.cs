using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Fix_OrderModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_OrderExtra_Orders_OrderId",
            //    table: "OrderExtra");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_OrderItem_Orders_OrderId",
            //    table: "OrderItem");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Orders_Branches_BranchId",
            //    table: "Orders");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_OrderStatusHistory_Orders_OrderId",
            //    table: "OrderStatusHistory");

            //migrationBuilder.DropUniqueConstraint(
            //    name: "AK_Orders_TempId1",
            //    table: "Orders");

            //migrationBuilder.DropUniqueConstraint(
            //    name: "AK_Orders_TempId2",
            //    table: "Orders");

            //migrationBuilder.DropUniqueConstraint(
            //    name: "AK_Orders_TempId3",
            //    table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_BranchId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Orders");

            //migrationBuilder.DropColumn(
            //    name: "TempId1",
            //    table: "Orders");

            //migrationBuilder.DropColumn(
            //    name: "TempId2",
            //    table: "Orders");

            //migrationBuilder.DropColumn(
            //    name: "TempId3",
            //    table: "Orders");

            //migrationBuilder.AddPrimaryKey(
            //    name: "PK_Orders",
            //    table: "Orders",
            //    column: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_OrderExtra_Orders_OrderId",
            //    table: "OrderExtra",
            //    column: "OrderId",
            //    principalTable: "Orders",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_OrderItem_Orders_OrderId",
            //    table: "OrderItem",
            //    column: "OrderId",
            //    principalTable: "Orders",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_OrderStatusHistory_Orders_OrderId",
            //    table: "OrderStatusHistory",
            //    column: "OrderId",
            //    principalTable: "Orders",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_OrderExtra_Orders_OrderId",
            //    table: "OrderExtra");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_OrderItem_Orders_OrderId",
            //    table: "OrderItem");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_OrderStatusHistory_Orders_OrderId",
            //    table: "OrderStatusHistory");

            //migrationBuilder.DropPrimaryKey(
            //    name: "PK_Orders",
            //    table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            //migrationBuilder.AddColumn<long>(
            //    name: "TempId1",
            //    table: "Orders",
            //    nullable: false,
            //    defaultValue: 0L);

            //migrationBuilder.AddColumn<long>(
            //    name: "TempId2",
            //    table: "Orders",
            //    nullable: false,
            //    defaultValue: 0L);

            //migrationBuilder.AddColumn<long>(
            //    name: "TempId3",
            //    table: "Orders",
            //    nullable: false,
            //    defaultValue: 0L);

            //migrationBuilder.AddUniqueConstraint(
            //    name: "AK_Orders_TempId1",
            //    table: "Orders",
            //    column: "TempId1");

            //migrationBuilder.AddUniqueConstraint(
            //    name: "AK_Orders_TempId2",
            //    table: "Orders",
            //    column: "TempId2");

            //migrationBuilder.AddUniqueConstraint(
            //    name: "AK_Orders_TempId3",
            //    table: "Orders",
            //    column: "TempId3");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BranchId",
                table: "Orders",
                column: "BranchId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_OrderExtra_Orders_OrderId",
            //    table: "OrderExtra",
            //    column: "OrderId",
            //    principalTable: "Orders",
            //    principalColumn: "TempId1",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_OrderItem_Orders_OrderId",
            //    table: "OrderItem",
            //    column: "OrderId",
            //    principalTable: "Orders",
            //    principalColumn: "TempId2",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Orders_Branches_BranchId",
            //    table: "Orders",
            //    column: "BranchId",
            //    principalTable: "Branches",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_OrderStatusHistory_Orders_OrderId",
            //    table: "OrderStatusHistory",
            //    column: "OrderId",
            //    principalTable: "Orders",
            //    principalColumn: "TempId3",
            //    onDelete: ReferentialAction.Cascade);
        }
    }
}
