using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class TransactionTableChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Transactions_TransactionId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Transactions_TransactionId",
                table: "Reservations");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.AddColumn<decimal>(
                name: "ProcessingPercentageFee",
                table: "PaymentType",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "ClientPayments",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClientId = table.Column<int>(nullable: false),
                    TransactionStartDate = table.Column<DateTime>(nullable: false),
                    TransactionEndDate = table.Column<DateTime>(nullable: false),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    ConfirmationNumber = table.Column<string>(nullable: true),
                    BankFrom = table.Column<string>(nullable: true),
                    UserId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientPayments_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientPayments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientTransactions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PaymentTypeId = table.Column<int>(nullable: false),
                    ConfirmationNumber = table.Column<string>(nullable: true),
                    TransactionDateTime = table.Column<DateTime>(nullable: false),
                    TypeId = table.Column<int>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    EventId = table.Column<int>(nullable: true),
                    ReservationId = table.Column<int>(nullable: true),
                    ClientPaymentId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientTransactions_ClientPayments_ClientPaymentId",
                        column: x => x.ClientPaymentId,
                        principalTable: "ClientPayments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientTransactions_PaymentType_PaymentTypeId",
                        column: x => x.PaymentTypeId,
                        principalTable: "PaymentType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientTransactions_TransactionType_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TransactionType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientPayments_ClientId",
                table: "ClientPayments",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPayments_UserId",
                table: "ClientPayments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTransactions_ClientPaymentId",
                table: "ClientTransactions",
                column: "ClientPaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTransactions_PaymentTypeId",
                table: "ClientTransactions",
                column: "PaymentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTransactions_TypeId",
                table: "ClientTransactions",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_ClientTransactions_TransactionId",
                table: "Invoices",
                column: "TransactionId",
                principalTable: "ClientTransactions",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_ClientTransactions_TransactionId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ClientTransactions_TransactionId",
                table: "Reservations");

            migrationBuilder.DropTable(
                name: "ClientTransactions");

            migrationBuilder.DropTable(
                name: "ClientPayments");

            migrationBuilder.DropColumn(
                name: "ProcessingPercentageFee",
                table: "PaymentType");

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    ConfirmationNumber = table.Column<string>(type: "text", nullable: true),
                    EventId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    PaymentTypeId = table.Column<int>(type: "integer", nullable: false),
                    ReservationId = table.Column<int>(type: "integer", nullable: true),
                    TransactionDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    TypeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_PaymentType_PaymentTypeId",
                        column: x => x.PaymentTypeId,
                        principalTable: "PaymentType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transactions_TransactionType_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TransactionType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_PaymentTypeId",
                table: "Transactions",
                column: "PaymentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_TypeId",
                table: "Transactions",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Transactions_TransactionId",
                table: "Invoices",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Transactions_TransactionId",
                table: "Reservations",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
