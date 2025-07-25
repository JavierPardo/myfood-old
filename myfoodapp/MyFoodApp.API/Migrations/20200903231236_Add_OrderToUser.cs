using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_OrderToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_OrderStatusHistory_AdminUserId",
                table: "OrderStatusHistory",
                column: "AdminUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderStatusHistory_AspNetUsers_AdminUserId",
                table: "OrderStatusHistory",
                column: "AdminUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderStatusHistory_AspNetUsers_AdminUserId",
                table: "OrderStatusHistory");

            migrationBuilder.DropIndex(
                name: "IX_OrderStatusHistory_AdminUserId",
                table: "OrderStatusHistory");
        }
    }
}
