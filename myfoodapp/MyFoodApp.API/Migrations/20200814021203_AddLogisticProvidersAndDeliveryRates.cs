using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFoodApp.API.Migrations
{
    public partial class AddLogisticProvidersAndDeliveryRates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LogisticProviders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    Contact = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Whatsapp = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    WebSite = table.Column<string>(nullable: true),
                    CityId = table.Column<int>(nullable: false),
                    CountryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogisticProviders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LogisticProviders_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LogisticProviders_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LogisticProviderRateTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogisticProviderRateTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BranchLogisticProviders",
                columns: table => new
                {
                    BranchId = table.Column<int>(nullable: false),
                    LogisticProviderId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchLogisticProviders", x => new { x.BranchId, x.LogisticProviderId });
                    table.ForeignKey(
                        name: "FK_BranchLogisticProviders_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BranchLogisticProviders_LogisticProviders_LogisticProviderId",
                        column: x => x.LogisticProviderId,
                        principalTable: "LogisticProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LogisticProviderRates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LogisticProviderId = table.Column<int>(nullable: false),
                    RateTypeId = table.Column<int>(nullable: false),
                    StartRange = table.Column<int>(nullable: false),
                    EndRange = table.Column<int>(nullable: false),
                    Fee = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogisticProviderRates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LogisticProviderRates_LogisticProviders_LogisticProviderId",
                        column: x => x.LogisticProviderId,
                        principalTable: "LogisticProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LogisticProviderRates_LogisticProviderRateTypes_RateTypeId",
                        column: x => x.RateTypeId,
                        principalTable: "LogisticProviderRateTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BranchLogisticProviders_LogisticProviderId",
                table: "BranchLogisticProviders",
                column: "LogisticProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_LogisticProviderRates_LogisticProviderId",
                table: "LogisticProviderRates",
                column: "LogisticProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_LogisticProviderRates_RateTypeId",
                table: "LogisticProviderRates",
                column: "RateTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LogisticProviders_CityId",
                table: "LogisticProviders",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_LogisticProviders_CountryId",
                table: "LogisticProviders",
                column: "CountryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BranchLogisticProviders");

            migrationBuilder.DropTable(
                name: "LogisticProviderRates");

            migrationBuilder.DropTable(
                name: "LogisticProviders");

            migrationBuilder.DropTable(
                name: "LogisticProviderRateTypes");
        }
    }
}
