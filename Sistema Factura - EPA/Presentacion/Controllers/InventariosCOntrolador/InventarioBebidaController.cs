using Datos.BebidasCD;
using Datos.InventarioBebidasCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Bebidas;
using Modelo.InventarioBebidas;

namespace Presentacion.Controllers.ProductoControlador
{
    public class InventarioBebidaController : Controller
    {
        [HttpGet]
        public IActionResult ViewInventarioBebidas()
        {
            return View("~/Views/Inventarios/ViewInventarioBebidas.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener()
        {
            List<InventarioBebidas> lista = InventarioBebidasCD.Instancia.ObtenerInventarioBebidas();
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
