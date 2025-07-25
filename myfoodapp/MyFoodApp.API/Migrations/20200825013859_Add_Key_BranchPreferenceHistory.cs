using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_Key_BranchPreferenceHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BranchPreferenceHistories",
                table: "BranchPreferenceHistories");

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "BranchPreferenceHistories",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BranchPreferenceHistories",
                table: "BranchPreferenceHistories",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BranchPreferenceHistories",
                table: "BranchPreferenceHistories");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "BranchPreferenceHistories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BranchPreferenceHistories",
                table: "BranchPreferenceHistories",
                column: "ModifiedDate");
        }
    }
}
