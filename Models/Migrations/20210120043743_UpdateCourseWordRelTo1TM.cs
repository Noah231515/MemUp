using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MemUp.Migrations
{
    public partial class UpdateCourseWordRelTo1TM : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseWord");

            migrationBuilder.AddColumn<Guid>(
                name: "CourseId",
                table: "Word",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Word_CourseId",
                table: "Word",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Word_Courses_CourseId",
                table: "Word",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Word_Courses_CourseId",
                table: "Word");

            migrationBuilder.DropIndex(
                name: "IX_Word_CourseId",
                table: "Word");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Word");

            migrationBuilder.CreateTable(
                name: "CourseWord",
                columns: table => new
                {
                    CoursesId = table.Column<Guid>(type: "TEXT", nullable: false),
                    WordsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseWord", x => new { x.CoursesId, x.WordsId });
                    table.ForeignKey(
                        name: "FK_CourseWord_Courses_CoursesId",
                        column: x => x.CoursesId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseWord_Word_WordsId",
                        column: x => x.WordsId,
                        principalTable: "Word",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseWord_WordsId",
                table: "CourseWord",
                column: "WordsId");
        }
    }
}
