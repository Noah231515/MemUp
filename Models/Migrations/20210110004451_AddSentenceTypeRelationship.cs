using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MemUp.Migrations
{
    public partial class AddSentenceTypeRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SentenceType",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Type = table.Column<string>(maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentenceType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sentence",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SentenceText = table.Column<string>(maxLength: 50, nullable: true),
                    WordId = table.Column<Guid>(nullable: true),
                    SentenceTypeId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sentence", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sentence_SentenceType_SentenceTypeId",
                        column: x => x.SentenceTypeId,
                        principalTable: "SentenceType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sentence_Word_WordId",
                        column: x => x.WordId,
                        principalTable: "Word",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sentence_SentenceTypeId",
                table: "Sentence",
                column: "SentenceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Sentence_WordId",
                table: "Sentence",
                column: "WordId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sentence");

            migrationBuilder.DropTable(
                name: "SentenceType");
        }
    }
}
