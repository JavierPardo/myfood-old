using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class ChangeTransactionForManualProcessing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                table: "ClientTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentTypeId",
                table: "ClientTransactions",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "ImageReference",
                table: "ClientTransactions",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                table: "ClientTransactions",
                column: "PaymentTypeId",
                principalTable: "PaymentType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "ImageReference",
                table: "ClientTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentTypeId",
                table: "ClientTransactions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                table: "ClientTransactions",
                column: "PaymentTypeId",
                principalTable: "PaymentType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
