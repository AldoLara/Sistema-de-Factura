using Modelo.Pedidos;

namespace Modelo.Facturas
{
    public class Factura
    {
        public int ID_Factura { get; set; }
        public int ID_Pedido { get; set; }
        public int ID_TipoPago { get; set; }
        public string? TipoDoc { get; set; }
        public string? NombreEmpresa { get; set; }

        public Pedido? ObjPedido { get; set; }
        public TipoPago? ObjTipoPago { get; set; }
    }
}
