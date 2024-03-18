using Datos.IngredientesCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Ingredientes;

namespace Presentacion.Controllers.SuministroControlador
{
    public class IngredienteController : Controller
    {
        [HttpGet]
        public IActionResult ViewIngredientes()
        {
            return View("~/Views/Suministros/ViewIngredientes.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener()
        {
            List<Ingrediente> lista = IngredienteCD.Instancia.ObtenerIngredientes();
            return Json(new { data = lista });

        }

        //inicio

        public JsonResult Guardar(Ingrediente objeto) // guardar uno nuevo o actualizar
        {
            bool respuesta = false;

            if (objeto.ID_Ingrediente == 0)
            {

                respuesta = IngredienteCD.Instancia.RegistrarIngrediente(objeto);
            }
            else
            {
                respuesta = IngredienteCD.Instancia.ModificarIngrediente(objeto);
            }
            return Json(new { resultado = respuesta });
        }

        [HttpGet]
        //   [Authorize(Roles = "Admin")]
        public JsonResult Eliminar(int id = 0)
        {
            bool respuesta = IngredienteCD.Instancia.EliminarIngrediente(id);
            return Json(new { resultado = respuesta });
        }
    }
}
