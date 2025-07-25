using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class AddBranchSchedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "ReservationSpecialEventId",
                table: "Reservations");

            migrationBuilder.AlterColumn<long>(
                name: "SpecialEventId",
                table: "Reservations",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "BranchExceptionDate",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<int>(nullable: false),
                    Service = table.Column<string>(nullable: true),
                    IsClosed = table.Column<bool>(nullable: false),
                    ExceptionDate = table.Column<DateTime>(nullable: false),
                    TimeStart1 = table.Column<TimeSpan>(nullable: true),
                    TimeStart2 = table.Column<TimeSpan>(nullable: true),
                    TimeStart3 = table.Column<TimeSpan>(nullable: true),
                    TimeEnd1 = table.Column<TimeSpan>(nullable: true),
                    TimeEnd2 = table.Column<TimeSpan>(nullable: true),
                    TimeEnd3 = table.Column<TimeSpan>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchExceptionDate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BranchSchedule",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<int>(nullable: false),
                    Service = table.Column<string>(nullable: true),
                    Day = table.Column<int>(nullable: false),
                    TimeStart1 = table.Column<TimeSpan>(nullable: false),
                    TimeStart2 = table.Column<TimeSpan>(nullable: true),
                    TimeStart3 = table.Column<TimeSpan>(nullable: true),
                    TimeEnd1 = table.Column<TimeSpan>(nullable: false),
                    TimeEnd2 = table.Column<TimeSpan>(nullable: true),
                    TimeEnd3 = table.Column<TimeSpan>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchSchedule", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations",
                column: "SpecialEventId",
                principalTable: "ReservationSpecialEvent",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations");

            migrationBuilder.DropTable(
                name: "BranchExceptionDate");

            migrationBuilder.DropTable(
                name: "BranchSchedule");

            migrationBuilder.AlterColumn<long>(
                name: "SpecialEventId",
                table: "Reservations",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddColumn<long>(
                name: "ReservationSpecialEventId",
                table: "Reservations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationSpecialEvent_SpecialEventId",
                table: "Reservations",
                column: "SpecialEventId",
                principalTable: "ReservationSpecialEvent",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
