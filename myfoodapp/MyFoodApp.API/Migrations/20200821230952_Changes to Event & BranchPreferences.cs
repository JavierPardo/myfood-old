using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class ChangestoEventBranchPreferences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "CouponDiscountAmount",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CouponId",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PctMyFoodApp",
                table: "Events",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalAmount",
                table: "Events",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ValueDataType",
                table: "BranchPreferences",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_CouponId",
                table: "Events",
                column: "CouponId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Coupons_CouponId",
                table: "Events",
                column: "CouponId",
                principalTable: "Coupons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Coupons_CouponId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_CouponId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CouponDiscountAmount",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CouponId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "PctMyFoodApp",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ValueDataType",
                table: "BranchPreferences");
        }
    }
}
