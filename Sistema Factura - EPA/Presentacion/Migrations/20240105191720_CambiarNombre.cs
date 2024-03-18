using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Presentacion.Migrations
{
    public partial class CambiarNombre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosClaims_Empleados_UserId",
                table: "EmpleadosClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosLogins_Empleados_UserId",
                table: "EmpleadosLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosRoles_Empleados_UserId",
                table: "EmpleadosRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosTokens_Empleados_UserId",
                table: "EmpleadosTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Empleados",
                table: "Empleados");

            migrationBuilder.RenameTable(
                name: "Empleados",
                newName: "Usuario");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario",
                column: "EmpleadoId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosClaims_Usuario_UserId",
                table: "EmpleadosClaims",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "EmpleadoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosLogins_Usuario_UserId",
                table: "EmpleadosLogins",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "EmpleadoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosRoles_Usuario_UserId",
                table: "EmpleadosRoles",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "EmpleadoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosTokens_Usuario_UserId",
                table: "EmpleadosTokens",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "EmpleadoId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosClaims_Usuario_UserId",
                table: "EmpleadosClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosLogins_Usuario_UserId",
                table: "EmpleadosLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosRoles_Usuario_UserId",
                table: "EmpleadosRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosTokens_Usuario_UserId",
                table: "EmpleadosTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario");

            migrationBuilder.RenameTable(
                name: "Usuario",
                newName: "Empleados");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Empleados",
                table: "Empleados",
                column: "EmpleadoId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosClaims_Empleados_UserId",
                table: "EmpleadosClaims",
                column: "UserId",
                principalTable: "Empleados",
                principalColumn: "EmpleadoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosLogins_Empleados_UserId",
                table: "EmpleadosLogins",
                column: "UserId",
                principalTable: "Empleados",
                principalColumn: "EmpleadoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosRoles_Empleados_UserId",
                table: "EmpleadosRoles",
                column: "UserId",
                principalTable: "Empleados",
                principalColumn: "EmpleadoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosTokens_Empleados_UserId",
                table: "EmpleadosTokens",
                column: "UserId",
                principalTable: "Empleados",
                principalColumn: "EmpleadoId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
