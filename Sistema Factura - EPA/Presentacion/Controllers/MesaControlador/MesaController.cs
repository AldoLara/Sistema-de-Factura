using Datos.MesasCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Mesas;

namespace Presentacion.Controllers.MesaControlador
{
    public class MesaController : Controller
    {
        // GET: MesaController
        public ActionResult ViewMesas()
        {
            return View("/Views/Mesas/ViewMesas.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener()
        {
            List<Mesa> lista = MesaCD.Instancia.ObtenerMesa();
            return Json(new { data = lista });

        }

        //inicio

        public JsonResult Guardar(Mesa objeto) // guardar uno nuevo o actualizar
        {
            bool respuesta = false;

            if (objeto.id == 0)
            {

                respuesta = MesaCD.Instancia.RegistrarMesa(objeto);
            }

            else
            {
                respuesta = MesaCD.Instancia.ModificarMesa(objeto);
            }
            return Json(new { resultado = respuesta });
        }
        //

        [HttpGet]
        //   [Authorize(Roles = "Admin")]
        public JsonResult Eliminar(int id = 0)
        {
            bool respuesta = MesaCD.Instancia.EliminarMesa(id);
            return Json(new { resultado = respuesta });
        }


    }
}
