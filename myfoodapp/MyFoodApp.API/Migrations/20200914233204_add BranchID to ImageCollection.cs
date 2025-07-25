using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class addBranchIDtoImageCollection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "ImageCollection",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ImageCollection_BranchId",
                table: "ImageCollection",
                column: "BranchId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageCollection_Branches_BranchId",
                table: "ImageCollection",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageCollection_Branches_BranchId",
                table: "ImageCollection");

            migrationBuilder.DropIndex(
                name: "IX_ImageCollection_BranchId",
                table: "ImageCollection");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "ImageCollection");
        }
    }
}
