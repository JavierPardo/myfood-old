using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_TransactionType_TypeId",
                table: "ClientTransactions");

            migrationBuilder.DropTable(
                name: "TransactionType");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_TransactionId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_ClientTransactions_TypeId",
                table: "ClientTransactions");

            migrationBuilder.DeleteData(
                table: "EventStatus",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "ConfirmationNumber",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "ClientTransactions");

            migrationBuilder.AddColumn<bool>(
                name: "Prepaid",
                table: "ReservationSpecialEvent",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "CurrentStatusId",
                table: "Reservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestedDateTime",
                table: "Reservations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "SpecialEventId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LogisticsProviderId",
                table: "Events",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<decimal>(
                name: "DeliveryCost",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TransactionId",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CurrentStatusId",
                table: "ClientTransactions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ProcessorAuthorizationId",
                table: "ClientTransactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProcessorDebtId",
                table: "ClientTransactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProcessorTransactionId",
                table: "ClientTransactions",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SuperAdminOnly",
                table: "BranchPreferences",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "ReservationStatus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationStatus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReservationStatusHistory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ReservationId = table.Column<long>(nullable: false),
                    StatusId = table.Column<int>(nullable: false),
                    ChangeDateTime = table.Column<DateTime>(nullable: false),
                    AdminUserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationStatusHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservationStatusHistory_Reservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "Reservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransactionStatus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionStatus", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "EventStatus",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Abierto");

            migrationBuilder.UpdateData(
                table: "EventStatus",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Cerrado");

            migrationBuilder.InsertData(
                table: "EventType",
                columns: new[] { "Id", "Name" },
                values: new object[] { 5, "Reserva Evento Especial" });

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Por Confirmar");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "En Proceso");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Rechazado");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "Listo para Despacho");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "Despachado");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 7,
                column: "Name",
                value: "Rechazado por Pago");

            migrationBuilder.InsertData(
                table: "ReservationStatus",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 3, "Rechazada" },
                    { 4, "Confirmada" },
                    { 1, "Por Confirmar" },
                    { 2, "Rechazada por Pago" }
                });

            migrationBuilder.InsertData(
                table: "TransactionStatus",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Autorizada" },
                    { 2, "Pago Procesado" },
                    { 3, "Autorización Cancelada" },
                    { 5, "Pendiente Efectivo" },
                    { 4, "Autorización Rechazada" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CurrentStatusId",
                table: "Reservations",
                column: "CurrentStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_SpecialEventId",
                table: "Reservations",
                column: "SpecialEventId");

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

            migrationBuilder.CreateIndex(
                name: "IX_ClientTransactions_CurrentStatusId",
                table: "ClientTransactions",
                column: "CurrentStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationStatusHistory_ReservationId",
                table: "ReservationStatusHistory",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_TransactionStatus_CurrentStatusId",
                table: "ClientTransactions",
                column: "CurrentStatusId",
                principalTable: "TransactionStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_ClientTransactions_TransactionId",
                table: "Events",
                column: "TransactionId",
                principalTable: "ClientTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationStatus_CurrentStatusId",
                table: "Reservations",
                column: "CurrentStatusId",
                principalTable: "ReservationStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations",
                column: "SpecialEventId",
                principalTable: "ReservationSpecialEvent",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientTransactions_TransactionStatus_CurrentStatusId",
                table: "ClientTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_ClientTransactions_TransactionId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationStatus_CurrentStatusId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations");

            migrationBuilder.DropTable(
                name: "ReservationStatus");

            migrationBuilder.DropTable(
                name: "ReservationStatusHistory");

            migrationBuilder.DropTable(
                name: "TransactionStatus");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_CurrentStatusId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_SpecialEventId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_TransactionId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Events_TransactionId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_ClientTransactions_CurrentStatusId",
                table: "ClientTransactions");

            migrationBuilder.DeleteData(
                table: "EventType",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "Prepaid",
                table: "ReservationSpecialEvent");

            migrationBuilder.DropColumn(
                name: "CurrentStatusId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "RequestedDateTime",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "SpecialEventId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "DeliveryCost",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CurrentStatusId",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "ProcessorAuthorizationId",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "ProcessorDebtId",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "ProcessorTransactionId",
                table: "ClientTransactions");

            migrationBuilder.DropColumn(
                name: "SuperAdminOnly",
                table: "BranchPreferences");

            migrationBuilder.AlterColumn<int>(
                name: "LogisticsProviderId",
                table: "Events",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConfirmationNumber",
                table: "ClientTransactions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "ClientTransactions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReservationId",
                table: "ClientTransactions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "ClientTransactions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TransactionType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionType", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "EventStatus",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Pendiente");

            migrationBuilder.UpdateData(
                table: "EventStatus",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Confirmado");

            migrationBuilder.InsertData(
                table: "EventStatus",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "Completado" });

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Pendiente");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Confirmado");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Nuevo en Mesa");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "En Proceso");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "Enviado");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 7,
                column: "Name",
                value: "Pagado en Mesa");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_TransactionId",
                table: "Reservations",
                column: "TransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTransactions_TypeId",
                table: "ClientTransactions",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientTransactions_TransactionType_TypeId",
                table: "ClientTransactions",
                column: "TypeId",
                principalTable: "TransactionType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
