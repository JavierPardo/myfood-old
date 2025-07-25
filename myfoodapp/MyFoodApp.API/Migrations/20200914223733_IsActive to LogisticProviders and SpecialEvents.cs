using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class IsActivetoLogisticProvidersandSpecialEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "ReservationSpecialEvent",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "LogisticProviderRateTypes",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "LogisticProviders",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsBranchDefault",
                table: "BranchLogisticProviders",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "LogisticProviderRateTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Por Distancia" },
                    { 2, "Tarifa Fija" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "LogisticProviderRateTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "LogisticProviderRateTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ReservationSpecialEvent");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "LogisticProviders");

            migrationBuilder.DropColumn(
                name: "IsBranchDefault",
                table: "BranchLogisticProviders");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "LogisticProviderRateTypes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
