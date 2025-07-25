using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_Branch_BranchExceptionDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BranchExceptionDate_BranchId",
                table: "BranchExceptionDate",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_BranchExceptionDate_Branches_BranchId",
                table: "BranchExceptionDate",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BranchExceptionDate_Branches_BranchId",
                table: "BranchExceptionDate");

            migrationBuilder.DropIndex(
                name: "IX_BranchExceptionDate_BranchId",
                table: "BranchExceptionDate");
        }
    }
}
