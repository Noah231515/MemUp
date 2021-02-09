using Microsoft.EntityFrameworkCore.Migrations;

namespace MemUp.Migrations
{
    public partial class AddWordDifficultyIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DifficultyIndex",
                table: "Word",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DifficultyIndex",
                table: "Word");
        }
    }
}
