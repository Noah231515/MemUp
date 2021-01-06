using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MemUp.Migrations
{
    public partial class AddWordTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Word",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    JapaneseVocab = table.Column<string>(maxLength: 20, nullable: true),
                    KanaVocab = table.Column<string>(maxLength: 20, nullable: true),
                    EnglishVocab = table.Column<string>(maxLength: 20, nullable: true),
                    PartOfSpeech = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Word", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Word");
        }
    }
}
