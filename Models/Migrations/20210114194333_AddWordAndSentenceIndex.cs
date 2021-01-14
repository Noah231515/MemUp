using Microsoft.EntityFrameworkCore.Migrations;

namespace MemUp.Migrations
{
    public partial class AddWordAndSentenceIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "Word",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WordIndex",
                table: "Sentence",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Index",
                table: "Word");

            migrationBuilder.DropColumn(
                name: "WordIndex",
                table: "Sentence");
        }
    }
}
