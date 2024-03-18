using Datos.EmpleadosCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Empleados;

namespace Presentacion.Controllers.UsuarioControlador
{
    public class PermisoController : Controller
    {
        [HttpGet]
        public IActionResult ViewPermisos()
        {
            return View("~/Views/Usuarios/ViewPermisos.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener(string id)
        {
            List<Permisos> olista = PermisosCD.Instancia.ObtenerPermisos(id);

            return Json(olista);
        }

        [HttpPost]
        public JsonResult Guardar(string xml)
        {
            bool Respuesta = PermisosCD.Instancia.ActualizarPermisos(xml);

            return Json(new { resultado = Respuesta });
        }
    }
}
