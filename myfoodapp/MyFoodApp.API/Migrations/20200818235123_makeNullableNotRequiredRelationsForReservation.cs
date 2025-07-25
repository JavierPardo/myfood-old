using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class makeNullableNotRequiredRelationsForReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Events_EventId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ClientTransactions_TransactionId",
                table: "Reservations");

            migrationBuilder.AlterColumn<long>(
                name: "TransactionId",
                table: "Reservations",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "SpecialEventId",
                table: "Reservations",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "EventId",
                table: "Reservations",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Events_EventId",
                table: "Reservations",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations",
                column: "SpecialEventId",
                principalTable: "ReservationSpecialEvent",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Events_EventId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ClientTransactions_TransactionId",
                table: "Reservations");

            migrationBuilder.AlterColumn<long>(
                name: "TransactionId",
                table: "Reservations",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "SpecialEventId",
                table: "Reservations",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "EventId",
                table: "Reservations",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Events_EventId",
                table: "Reservations",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations",
                column: "SpecialEventId",
                principalTable: "ReservationSpecialEvent",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ClientTransactions_TransactionId",
                table: "Reservations",
                column: "TransactionId",
                principalTable: "ClientTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
