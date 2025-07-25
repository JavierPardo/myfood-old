using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class AdditionOfBranchToOptionSideCategoryItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Sides",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Options",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Categories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Sides_BranchId",
                table: "Sides",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Options_BranchId",
                table: "Options",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_BranchId",
                table: "Items",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_BranchId",
                table: "Categories",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Branches_BranchId",
                table: "Categories",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Branches_BranchId",
                table: "Items",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Options_Branches_BranchId",
                table: "Options",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sides_Branches_BranchId",
                table: "Sides",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Branches_BranchId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Branches_BranchId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Options_Branches_BranchId",
                table: "Options");

            migrationBuilder.DropForeignKey(
                name: "FK_Sides_Branches_BranchId",
                table: "Sides");

            migrationBuilder.DropIndex(
                name: "IX_Sides_BranchId",
                table: "Sides");

            migrationBuilder.DropIndex(
                name: "IX_Options_BranchId",
                table: "Options");

            migrationBuilder.DropIndex(
                name: "IX_Items_BranchId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Categories_BranchId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Sides");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Categories");
        }
    }
}
