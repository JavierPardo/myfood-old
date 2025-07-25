using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class CouponDiscountType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentType_PaymentProvider_PaymentProviderId",
                table: "PaymentType");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentProviderId",
                table: "PaymentType",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "DiscountType",
                table: "Coupons",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentType_PaymentProvider_PaymentProviderId",
                table: "PaymentType",
                column: "PaymentProviderId",
                principalTable: "PaymentProvider",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentType_PaymentProvider_PaymentProviderId",
                table: "PaymentType");

            migrationBuilder.DropColumn(
                name: "DiscountType",
                table: "Coupons");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentProviderId",
                table: "PaymentType",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentType_PaymentProvider_PaymentProviderId",
                table: "PaymentType",
                column: "PaymentProviderId",
                principalTable: "PaymentProvider",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
