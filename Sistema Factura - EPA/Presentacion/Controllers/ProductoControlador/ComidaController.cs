using Datos.ComidasCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Comidas;


namespace Presentacion.Controllers.ProductoControlador
{
    public class ComidaController : Controller
    {
        public IActionResult ViewComidas()
        {
            return View("/Views/Productos/ViewComidas.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener()
        {
            List<Comida> lista = ComidaCD.Instancia.ObtenerComidas();
            return Json(new { data = lista });

        }

        //inicio

        public JsonResult Guardar(Comida objeto) // guardar uno nuevo o actualizar
        {
            bool respuesta = false;

            if (objeto.ID_Comida == 0)
            {

                respuesta = ComidaCD.Instancia.RegistrarComida(objeto);
            }

            else
            {
                respuesta = ComidaCD.Instancia.ModificarComida(objeto);
            }
            return Json(new { resultado = respuesta });
        }
        //

        [HttpGet]
        //   [Authorize(Roles = "Admin")]
        public JsonResult Eliminar(int id = 0)
        {
            bool respuesta = ComidaCD.Instancia.EliminarComida(id);
            return Json(new { resultado = respuesta });
        }

    }
}
