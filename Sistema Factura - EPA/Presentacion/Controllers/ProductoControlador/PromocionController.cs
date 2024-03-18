using Datos.PromocionCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Promociones;

namespace Presentacion.Controllers.ProductoControlador
{
    public class PromocionController : Controller
    {
        public IActionResult ViewPromociones()
        {
            return View("/Views/Productos/ViewPromociones.cshtml");
        }


        [HttpGet]
        public JsonResult Obtener()
        {
            List<Promocion> lista = PromocionCD.Instancia.ObtenerPromociones();
            return Json(new { data = lista });

        }

        [HttpGet]
        public JsonResult ObtenerPP(int id = 0)
        {
            List<Promocion> lista = PromocionCD.Instancia.PromocionProducto(id);
            return Json(new { data = lista });

        }


        public JsonResult Guardar(string xml)
        {
            bool respuesta = PromocionCD.Instancia.RegistrarPromocion(xml);

            return Json(new { resultado = respuesta });
        }

        public JsonResult Actualizar(string xml)
        {
            bool respuesta = PromocionCD.Instancia.ModificarPromocion(xml);

            return Json(new { resultado = respuesta });
        }


        [HttpGet]
        public JsonResult Eliminar(int id)
        {
            bool respuesta = PromocionCD.Instancia.EliminarPromocion(id);
            return Json(new { resultado = respuesta });
        }


    }
}
