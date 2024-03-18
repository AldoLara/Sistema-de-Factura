using Datos.BebidasCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Bebidas;

namespace Presentacion.Controllers.ProductoControlador
{
    public class BebidaController : Controller
    {
        [HttpGet]
        public IActionResult ViewBebidas()
        {
            return View("~/Views/Productos/ViewBebidas.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener(int inventario)
        {
            List<Bebida> lista = BebidaCD.Instancia.ObtenerBebidas(inventario);
            return Json(new { data = lista });

        }

        //inicio

        public JsonResult Guardar(Bebida objeto) // guardar uno nuevo o actualizar
        {
            bool respuesta = false;

            if (objeto.ID_Bebida == 0)
            {

                respuesta = BebidaCD.Instancia.RegistrarBebida(objeto);
            }

            else
            {
                respuesta = BebidaCD.Instancia.ModificarBebida(objeto);
            }
            return Json(new { resultado = respuesta });
        }
        //

        [HttpGet]
        //   [Authorize(Roles = "Admin")]
        public JsonResult Eliminar(int id = 0)
        {
            bool respuesta = BebidaCD.Instancia.EliminarBebida(id);
            return Json(new { resultado = respuesta });
        }


    }
}
