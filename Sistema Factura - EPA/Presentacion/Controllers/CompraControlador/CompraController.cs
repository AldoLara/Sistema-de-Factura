
using Datos.CompraCD;
using Microsoft.AspNetCore.Mvc;

using Modelo.Compras;

namespace Presentacion.Controllers.CompraControlador
{
    public class CompraController : Controller
    {
        public IActionResult ViewCompraCrear()
        {
            ViewBag.Title = "Crear Compra";
            return View("/Views/Compras/ViewCompraCrear.cshtml");
        }



        [HttpGet]
        public ActionResult Consultar()
        {
            return View("/Views/Compras/Consultar.cshtml");
        }
        [HttpGet]
        public ActionResult Crear()
        {
            return View("/Views/Compra/Crear.cshtml");
        }


        [HttpGet]
        public JsonResult Obtener(DateTime? fechaInicio, DateTime? fechaFin, int idproveedor, int idtienda)
        {
            List<Compra> lista = ComprasCD.Instancia.ObtenerListaCompra(fechaInicio, fechaFin, idproveedor, idtienda);
            return Json(new { data = lista });
        }


        //Guardar Compra
        [HttpPost]
        public JsonResult Guardar(string xml)
        {
            bool respuesta = ComprasCD.Instancia.RegistrarCompra(xml);

            return Json(new { resultado = respuesta });
        }


        //Vista de Detalle de una Compra
        public ActionResult Detalle(int idcompra = 0)
        {
            Compra oCompra = ComprasCD.Instancia.ObtenerDetalleCompra(idcompra);

            if (oCompra == null)
            {
                oCompra = new Compra();
            }

            return View("/Views/Compras/Detalle.cshtml", oCompra);
        }

    }
}
