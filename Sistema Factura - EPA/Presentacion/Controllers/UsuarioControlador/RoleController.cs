using Datos.EmpleadosCD;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presentacion.Models;
using System.Data;

namespace Presentacion.Controllers.UsuarioControlador
{
    public class RoleController : Controller
    {
        private readonly RoleManager<UserRole> _manager;
        public List<UserRole> Roles { get; set; }

        public RoleController(RoleManager<UserRole> roleManager)
        {
            this._manager = roleManager;
        }

        [HttpGet]
        public IActionResult ViewRoles()
        {
            return View("~/Views/Usuarios/ViewRoles.cshtml");
        }


        public async Task<IActionResult> Obtener()
        {
            List<UserRole> listRoles = new List<UserRole>();

            Roles = await _manager.Roles.ToListAsync();

            listRoles = Roles.Where(role => role.Name != "SuperAdmin").ToList();

            return Json(listRoles);
        }



        public async Task<IActionResult> Guardar(UserRole role)
        {
            var resultado = false;
            if (role.Id == "0")
            {

                try
                {
                    if (!_manager.RoleExistsAsync(role.Name).GetAwaiter().GetResult())
                    {
                        var respuesta = _manager.CreateAsync(new UserRole { Estado = role.Estado, Name = role.Name }).GetAwaiter().GetResult();
                        if (respuesta.Succeeded)
                        {
                            var nuevoRol = await _manager.FindByNameAsync(role.Name);

                            if (nuevoRol != null)
                            {
                                string idRolCreado = nuevoRol.Id;
                                PermisosCD.Instancia.RegistrarPermisoRol(idRolCreado);
                                resultado = true;
                            }
                        }

                    }
                }
                catch (Exception)
                {

                    resultado = false;
                }

            }
            else
            {
                var roles = await _manager.FindByIdAsync(role.Id);
                try
                {
                    if (roles != null)
                    {
                        roles.Name = role.Name;
                        roles.Estado = role.Estado;
                        IdentityResult roleResult = await _manager.UpdateAsync(roles);
                        if (roleResult.Succeeded)
                            resultado = true;

                    }
                }
                catch (Exception)
                {

                    resultado = false;
                }

            }

            return Json(new { res = resultado });
        }


        public async Task<IActionResult> Eliminar(UserRole role)
        {
            var resultado = false;

            var roles = await _manager.FindByNameAsync(role.Name);
            try
            {
                if (roles != null)
                {
                    var res = PermisosCD.Instancia.EliminarPermiso(roles.Id);
                    IdentityResult roleResult = await _manager.DeleteAsync(roles);
                    if (res = true && roleResult.Succeeded)
                        resultado = true;

                }
            }
            catch (Exception)
            {

                resultado = false;
            }

            return Json(new { res = resultado });
        }


    }
}
