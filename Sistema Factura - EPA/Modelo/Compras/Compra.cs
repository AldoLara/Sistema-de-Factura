using Modelo.Proveedor;

namespace Modelo.Compras
{
    public class Compra
    {
        public int IdCompra { get; set; }
        public int IdProveedor { get; set; }
        public string? NumeroCompra { get; set; }
        public int IdSucursal { get; set; }

        public decimal TotalCosto { get; set; }
        public bool Estado { get; set; }
        public string? FechaRegistro { get; set; }

        public Sucursal? oSucursal { get; set; }
        public Proveedores? oProveedor { get; set; }
        public List<DetalleCompra>? oListaDetalleCompra { get; set; }
    }
}
