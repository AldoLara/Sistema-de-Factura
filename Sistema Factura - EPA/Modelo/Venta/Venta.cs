using Modelo.Empleados;
using Modelo.Mesas;
using Modelo.Promociones;

namespace Modelo.Venta
{
    public class Venta
    {
        public int IdVenta { get; set; }
        public string Codigo { get; set; }
        public string IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string Cliente { get; set; }
        public int CantidadProducto { get; set; }
        public int CantidadTotal { get; set; }
        public decimal TotalCosto { get; set; }
        public string TextoTotalCosto { get; set; }
        public decimal ImporteRecibido { get; set; }
        public string TextoImporteRecibido { get; set; }
        public decimal ImporteCambio { get; set; }
        public string TextoImporteCambio { get; set; }


        public Mesa? oMesa { get; set; }
        public Sucursal? oSucursal { get; set; }
        public Empleado? oEmpleado { get; set; }
        public List<Promocion>? oListaPromocion { get; set; }
        public List<DetalleVenta>? oListaDetalleVenta { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public decimal Descuento { get; set; }
        public string? TipoPago { get; set; }
        public string TextDescuento { get; set; }
    }
}
