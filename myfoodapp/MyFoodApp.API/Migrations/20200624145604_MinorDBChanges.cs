using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class MinorDBChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientsUsers");

            migrationBuilder.AddColumn<string>(
                name: "CountryPhoneCode",
                table: "Countries",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ClientsAdminUsers",
                columns: table => new
                {
                    ClientId = table.Column<int>(nullable: false),
                    UserId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsAdminUsers", x => new { x.ClientId, x.UserId });
                    table.ForeignKey(
                        name: "FK_ClientsAdminUsers_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientsAdminUsers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "EventType",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Camarero Virtual");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 6,
                column: "Name",
                value: "Recibido");

            migrationBuilder.InsertData(
                table: "OrderStatus",
                columns: new[] { "Id", "Name" },
                values: new object[] { 7, "Pagado en Mesa" });

            migrationBuilder.CreateIndex(
                name: "IX_ClientsAdminUsers_UserId",
                table: "ClientsAdminUsers",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientsAdminUsers");

            migrationBuilder.DeleteData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DropColumn(
                name: "CountryPhoneCode",
                table: "Countries");

            migrationBuilder.CreateTable(
                name: "ClientsUsers",
                columns: table => new
                {
                    ClientId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsUsers", x => new { x.ClientId, x.UserId });
                    table.ForeignKey(
                        name: "FK_ClientsUsers_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientsUsers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "EventType",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Pedido Mesa");

            migrationBuilder.UpdateData(
                table: "OrderStatus",
                keyColumn: "Id",
                keyValue: 6,
                column: "Name",
                value: "Pagado en Mesa");

            migrationBuilder.CreateIndex(
                name: "IX_ClientsUsers_UserId",
                table: "ClientsUsers",
                column: "UserId");
        }
    }
}
