using Datos.ReportesCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Reportes;
using static Datos.ReportesCD.ReporteCD;

namespace Presentacion.Controllers.ReporteControlador
{
    public class ReporteController : Controller
    {
        public IActionResult ViewReporteVenta()
        {

            return View("/Views/Reportes/ViewReporteVenta.cshtml");
        }

        public IActionResult ViewReporteCompra()
        {
            return View("/Views/Reportes/ViewReporteCompra.cshtml");
        }

        /*======== REPORTES VENTAS ==========*/
        public JsonResult ObtenerVenta(string fechainicio, string fechafin, int idtienda, int cierre)
        {

            List<ReporteVenta> lista = ReporteCD.Instancia.ReporteVenta(Convert.ToDateTime(fechainicio), Convert.ToDateTime(fechafin), idtienda, cierre);
            return Json(lista);
        }

        public JsonResult ObtenerVentaProducto(string fechainicio, string fechafin, int cierre)
        {
            List<ReporteVentaProducto> lista = new List<ReporteVentaProducto>();

            lista = ReporteCD.Instancia.ObtenerReporteVentaProducto(Convert.ToDateTime(fechainicio), Convert.ToDateTime(fechafin), cierre);
            return Json(lista);
        }


        public ActionResult Cierre()
        {
            List<ReporteVentaProducto> lista = new List<ReporteVentaProducto>();

            lista = ReporteCD.Instancia.ObtenerCierreVentaProducto();
            return Json(lista);
        }

        public ActionResult CierreIngrediente(string xml)
        {
            List<ReporteIngrediente> lista = new List<ReporteIngrediente>();
            lista = ReporteCD.Instancia.ObtenerCierreIngrediente(xml);

            return Json(lista);
        }

        public ActionResult CierreIngredienteVerificar(int cierre, string fecha)
        {
            List<ReporteIngrediente> lista = new List<ReporteIngrediente>();
            lista = ReporteCD.Instancia.CierreIngredienteVerificar(cierre, Convert.ToDateTime(fecha));

            return Json(lista);
        }
        /*======== FIN REPORTES VENTAS ==========*/


        /*======== REPORTES COMPRAS ==========*/
        public JsonResult ObtenerCompra(string fechainicio, string fechafin)
        {

            List<ReporteCompra> lista = ReporteCD.Instancia.ObtenerReporteCompra(Convert.ToDateTime(fechainicio), Convert.ToDateTime(fechafin));
            return Json(lista);
        }
        /*======== FIN REPORTES COMPRAS ==========*/
    }
}
