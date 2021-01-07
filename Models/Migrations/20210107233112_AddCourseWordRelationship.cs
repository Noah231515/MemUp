using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MemUp.Migrations
{
    public partial class AddCourseWordRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CourseWord",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(nullable: false),
                    WordId = table.Column<Guid>(nullable: false),
                    Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseWord", x => new { x.CourseId, x.WordId });
                    table.ForeignKey(
                        name: "FK_CourseWord_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseWord_Word_WordId",
                        column: x => x.WordId,
                        principalTable: "Word",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseWord_WordId",
                table: "CourseWord",
                column: "WordId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseWord");
        }
    }
}
