using Datos.InventarioIngredientesCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.InventarioIngredientes;

namespace Presentacion.Controllers.ProductoControlador
{
    public class InventarioIngredientesController : Controller
    {
        [HttpGet]
        public IActionResult ViewInventarioIngredientes()
        {
            return View("~/Views/Inventarios/ViewInventarioIngredientes.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener()
        {
            List<InventarioIngredientes> lista = InventarioIngredientesCD.Instancia.ObtenerInventarioIngredientes();
            return Json(new { data = lista });

        }


    }
}
