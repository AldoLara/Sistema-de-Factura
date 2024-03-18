using Datos.InventarioBebidasCD;
using Datos.VentasCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Promociones;
using Modelo.Venta;
using System.Globalization;
//using System.Web.Mvc;

namespace Presentacion.Controllers.VentaControlador
{
    public class VentaController : Controller
    {
        public IActionResult ViewVentasCrear()
        {
            return View("/Views/Ventas/ViewVentasCrear.cshtml");
        }

        public ActionResult ConsultarVenta()
        {
            return View("/Views/Ventas/ConsultarVenta.cshtml");
        }

        [HttpPost]
        public JsonResult ControlarStock(int idproducto, int cantidad, bool restar)
        {
            bool respuesta = InventarioBebidasCD.Instancia.ControlarStock(idproducto, cantidad, restar);
            return Json(new { resultado = respuesta });
        }

        [HttpPost]
        public JsonResult Guardar(string xml)
        {

            int Respuesta = 0;
            Respuesta = VentasCD.Instancia.RegistrarVenta(xml);

            return Json(new { resultado = Respuesta });
        }



        //Visualizar detalles Venta

        public ActionResult Detalle(int IdVenta = 0)
        {

            Venta oVenta = VentasCD.Instancia.ObtenerDetalleVenta(IdVenta);



            NumberFormatInfo formato = new CultureInfo("es-PE").NumberFormat;
            formato.CurrencyGroupSeparator = ".";


            if (oVenta == null)
                oVenta = new Venta();
            else
            {
                if (oVenta.oListaDetalleVenta != null)
                {
                    oVenta.oListaDetalleVenta = (from dv in oVenta.oListaDetalleVenta
                                                 select new DetalleVenta()
                                                 {
                                                     Cantidad = dv.Cantidad,
                                                     NombreProducto = dv.NombreProducto,
                                                     PrecioUnidad = dv.PrecioUnidad,
                                                     TextoPrecioUnidad = dv.PrecioUnidad.ToString("N2", formato), //numero.ToString("C", formato)
                                                     ImporteTotal = dv.ImporteTotal,
                                                     TextoImporteTotal = dv.ImporteTotal.ToString("N2", formato)
                                                 }).ToList();

                }
                if (oVenta.oListaPromocion != null)
                {
                    oVenta.oListaPromocion = (from p in oVenta.oListaPromocion
                                              select new Promocion()
                                              {
                                                  Cantidad = p.Cantidad,
                                                  Nombre = p.Nombre,
                                                  Precio = p.Precio,
                                                  TextoPrecio = p.Precio.ToString("N2", formato), //numero.ToString("C", formato)
                                                  ImporteTotalPromo = p.ImporteTotalPromo,
                                                  TextoImporte = p.ImporteTotalPromo.ToString("N2", formato)
                                              }).ToList();
                }
                oVenta.TextoImporteRecibido = oVenta.ImporteRecibido.ToString("N2", formato);
                oVenta.TextoImporteCambio = oVenta.ImporteCambio.ToString("N2", formato);
                oVenta.TextoTotalCosto = oVenta.TotalCosto.ToString("N2", formato);
                if (oVenta.Descuento != null)
                {
                    oVenta.TextDescuento = oVenta.Descuento.ToString("N2", formato);
                }

            }


            return View("/Views/Ventas/DetalleVenta.cshtml", oVenta);
        }


        //Obtener Ventas
        public JsonResult Obtener(string codigo, string fechainicio, string fechafin, string nombres)
        {
            List<Venta> lista = VentasCD.Instancia.ObtenerListaVenta(codigo, Convert.ToDateTime(fechainicio), Convert.ToDateTime(fechafin), nombres);


            if (lista == null)
                lista = new List<Venta>();

            return Json(new { data = lista });
        }

    }
}
