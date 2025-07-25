using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Cambiosparasoportarmultiplestransactionsporeventooreserva : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                table: "ClientTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_ClientTransactions_TransactionId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ClientTransactions_TransactionId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_TransactionId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Events_TransactionId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PctMyFoodApp",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "Events");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentTypeId",
                table: "ClientTransactions",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MyFoodAppFeeAmount",
                table: "ClientTransactions",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PaymentProcessorFeeAmount",
                table: "ClientTransactions",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PctMyFoodApp",
                table: "ClientTransactions",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<long>(
                name: "ReservationId",
                table: "ClientTransactions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClientTransactions_EventId",
                table: "ClientTransactions",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTransactions_ReservationId",
                table: "ClientTransactions",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_Events_EventId",
                table: "ClientTransactions",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                table: "ClientTransactions",
                column: "PaymentTypeId",
                principalTable: "PaymentType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_Reservations_ReservationId",
                table: "ClientTransactions",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_Events_EventId",
                table: "ClientTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                table: "ClientTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_Reservations_ReservationId",
                table: "ClientTransactions");

            migrationBuilder.DropIndex(
                name: "IX_ClientTransactions_EventId",
                table: "ClientTransactions");

            migrationBuilder.DropIndex(
                name: "IX_ClientTransactions_ReservationId",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "MyFoodAppFeeAmount",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "PaymentProcessorFeeAmount",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "PctMyFoodApp",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "ClientTransactions");

            migrationBuilder.AddColumn<long>(
                name: "TransactionId",
                table: "Reservations",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PctMyFoodApp",
                table: "Events",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<long>(
                name: "TransactionId",
                table: "Events",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PaymentTypeId",
                table: "ClientTransactions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_TransactionId",
                table: "Reservations",
                column: "TransactionId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_TransactionId",
                table: "Events",
                column: "TransactionId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                table: "ClientTransactions",
                column: "PaymentTypeId",
                principalTable: "PaymentType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_ClientTransactions_TransactionId",
                table: "Events",
                column: "TransactionId",
                principalTable: "ClientTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ClientTransactions_TransactionId",
                table: "Reservations",
                column: "TransactionId",
                principalTable: "ClientTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
