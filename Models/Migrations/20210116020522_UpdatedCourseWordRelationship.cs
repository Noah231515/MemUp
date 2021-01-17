using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MemUp.Migrations
{
    public partial class UpdatedCourseWordRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseWord_Courses_CourseId",
                table: "CourseWord");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseWord_Word_WordId",
                table: "CourseWord");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseWord",
                table: "CourseWord");

            migrationBuilder.DropIndex(
                name: "IX_CourseWord_WordId",
                table: "CourseWord");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "CourseWord");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CourseWord",
                newName: "WordsId");

            migrationBuilder.RenameColumn(
                name: "WordId",
                table: "CourseWord",
                newName: "CoursesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseWord",
                table: "CourseWord",
                columns: new[] { "CoursesId", "WordsId" });

            migrationBuilder.CreateIndex(
                name: "IX_CourseWord_WordsId",
                table: "CourseWord",
                column: "WordsId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseWord_Courses_CoursesId",
                table: "CourseWord",
                column: "CoursesId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseWord_Word_WordsId",
                table: "CourseWord",
                column: "WordsId",
                principalTable: "Word",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseWord_Courses_CoursesId",
                table: "CourseWord");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseWord_Word_WordsId",
                table: "CourseWord");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseWord",
                table: "CourseWord");

            migrationBuilder.DropIndex(
                name: "IX_CourseWord_WordsId",
                table: "CourseWord");

            migrationBuilder.RenameColumn(
                name: "WordsId",
                table: "CourseWord",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "CoursesId",
                table: "CourseWord",
                newName: "WordId");

            migrationBuilder.AddColumn<Guid>(
                name: "CourseId",
                table: "CourseWord",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseWord",
                table: "CourseWord",
                columns: new[] { "CourseId", "WordId" });

            migrationBuilder.CreateIndex(
                name: "IX_CourseWord_WordId",
                table: "CourseWord",
                column: "WordId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseWord_Courses_CourseId",
                table: "CourseWord",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseWord_Word_WordId",
                table: "CourseWord",
                column: "WordId",
                principalTable: "Word",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
