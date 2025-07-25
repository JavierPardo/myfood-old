using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class ChangeTransactionToNnotTiedAStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_TransactionStatus_CurrentStatusId",
                table: "ClientTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "CurrentStatusId",
                table: "ClientTransactions",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_TransactionStatus_CurrentStatusId",
                table: "ClientTransactions",
                column: "CurrentStatusId",
                principalTable: "TransactionStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_TransactionStatus_CurrentStatusId",
                table: "ClientTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "CurrentStatusId",
                table: "ClientTransactions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_TransactionStatus_CurrentStatusId",
                table: "ClientTransactions",
                column: "CurrentStatusId",
                principalTable: "TransactionStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
