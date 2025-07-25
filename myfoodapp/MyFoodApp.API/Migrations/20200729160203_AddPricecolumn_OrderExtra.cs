using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class AddPricecolumn_OrderExtra : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "OrderItemSelectedSides",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "OrderItemSelectedSides");
        }
    }
}
