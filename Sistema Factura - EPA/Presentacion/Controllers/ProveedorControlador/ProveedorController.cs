using Datos.ProveedorCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Proveedor;

namespace Presentacion.Controllers.ProveedorControlador
{
    public class ProveedorController : Controller
    {
        [HttpGet]
        public IActionResult ViewProveedores()
        {
            return View("~/Views/Proveedores/ViewProveedores.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener()
        {
            List<Proveedores> lista = ProveedoresCD.Instancia.ObtenerProveedor();
            return Json(new { data = lista });

        }

        //inicio

        public JsonResult Guardar(Proveedores objeto) // guardar uno nuevo o actualizar
        {
            bool respuesta = false;

            if (objeto.ID_Proveedor == 0)
            {

                respuesta = ProveedoresCD.Instancia.RegistrarProveedor(objeto);
            }

            else
            {
                respuesta = ProveedoresCD.Instancia.ModificarProveedor(objeto);
            }
            return Json(new { resultado = respuesta });
        }
        //

        [HttpGet]
        //   [Authorize(Roles = "Admin")]
        public JsonResult Eliminar(int id = 0)
        {
            bool respuesta = ProveedoresCD.Instancia.EliminarProveedor(id);
            return Json(new { resultado = respuesta });
        }


        //fin
    }
}
