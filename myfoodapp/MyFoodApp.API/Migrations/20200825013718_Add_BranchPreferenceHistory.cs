using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_BranchPreferenceHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BranchPreferenceHistories",
                columns: table => new
                {
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<long>(nullable: false),
                    Old = table.Column<string>(nullable: true),
                    Current = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchPreferenceHistories", x => x.ModifiedDate);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BranchPreferenceHistories");
        }
    }
}
