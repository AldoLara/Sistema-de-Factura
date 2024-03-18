using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Presentacion.Migrations
{
    public partial class CambiarNombresTablas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosClaims_Usuario_UserId",
                table: "EmpleadosClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosLogins_Usuario_UserId",
                table: "EmpleadosLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosRoles_Roles_RoleId",
                table: "EmpleadosRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosRoles_Usuario_UserId",
                table: "EmpleadosRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpleadosTokens_Usuario_UserId",
                table: "EmpleadosTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmpleadosTokens",
                table: "EmpleadosTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmpleadosRoles",
                table: "EmpleadosRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmpleadosLogins",
                table: "EmpleadosLogins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmpleadosClaims",
                table: "EmpleadosClaims");

            migrationBuilder.RenameTable(
                name: "EmpleadosTokens",
                newName: "UsuariosTokens");

            migrationBuilder.RenameTable(
                name: "EmpleadosRoles",
                newName: "UsuariosRoles");

            migrationBuilder.RenameTable(
                name: "EmpleadosLogins",
                newName: "UsuariosLogins");

            migrationBuilder.RenameTable(
                name: "EmpleadosClaims",
                newName: "UsuariosClaims");

            migrationBuilder.RenameIndex(
                name: "IX_EmpleadosRoles_RoleId",
                table: "UsuariosRoles",
                newName: "IX_UsuariosRoles_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_EmpleadosLogins_UserId",
                table: "UsuariosLogins",
                newName: "IX_UsuariosLogins_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_EmpleadosClaims_UserId",
                table: "UsuariosClaims",
                newName: "IX_UsuariosClaims_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsuariosTokens",
                table: "UsuariosTokens",
                columns: new[] { "UserId", "LoginProvider", "Name" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsuariosRoles",
                table: "UsuariosRoles",
                columns: new[] { "UserId", "RoleId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsuariosLogins",
                table: "UsuariosLogins",
                columns: new[] { "LoginProvider", "ProviderKey" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsuariosClaims",
                table: "UsuariosClaims",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UsuariosClaims_Usuario_UserId",
                table: "UsuariosClaims",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsuariosLogins_Usuario_UserId",
                table: "UsuariosLogins",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsuariosRoles_Roles_RoleId",
                table: "UsuariosRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsuariosRoles_Usuario_UserId",
                table: "UsuariosRoles",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsuariosTokens_Usuario_UserId",
                table: "UsuariosTokens",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsuariosClaims_Usuario_UserId",
                table: "UsuariosClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_UsuariosLogins_Usuario_UserId",
                table: "UsuariosLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_UsuariosRoles_Roles_RoleId",
                table: "UsuariosRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UsuariosRoles_Usuario_UserId",
                table: "UsuariosRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UsuariosTokens_Usuario_UserId",
                table: "UsuariosTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsuariosTokens",
                table: "UsuariosTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsuariosRoles",
                table: "UsuariosRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsuariosLogins",
                table: "UsuariosLogins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsuariosClaims",
                table: "UsuariosClaims");

            migrationBuilder.RenameTable(
                name: "UsuariosTokens",
                newName: "EmpleadosTokens");

            migrationBuilder.RenameTable(
                name: "UsuariosRoles",
                newName: "EmpleadosRoles");

            migrationBuilder.RenameTable(
                name: "UsuariosLogins",
                newName: "EmpleadosLogins");

            migrationBuilder.RenameTable(
                name: "UsuariosClaims",
                newName: "EmpleadosClaims");

            migrationBuilder.RenameIndex(
                name: "IX_UsuariosRoles_RoleId",
                table: "EmpleadosRoles",
                newName: "IX_EmpleadosRoles_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_UsuariosLogins_UserId",
                table: "EmpleadosLogins",
                newName: "IX_EmpleadosLogins_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UsuariosClaims_UserId",
                table: "EmpleadosClaims",
                newName: "IX_EmpleadosClaims_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmpleadosTokens",
                table: "EmpleadosTokens",
                columns: new[] { "UserId", "LoginProvider", "Name" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmpleadosRoles",
                table: "EmpleadosRoles",
                columns: new[] { "UserId", "RoleId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmpleadosLogins",
                table: "EmpleadosLogins",
                columns: new[] { "LoginProvider", "ProviderKey" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmpleadosClaims",
                table: "EmpleadosClaims",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosClaims_Usuario_UserId",
                table: "EmpleadosClaims",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosLogins_Usuario_UserId",
                table: "EmpleadosLogins",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosRoles_Roles_RoleId",
                table: "EmpleadosRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosRoles_Usuario_UserId",
                table: "EmpleadosRoles",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpleadosTokens_Usuario_UserId",
                table: "EmpleadosTokens",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
