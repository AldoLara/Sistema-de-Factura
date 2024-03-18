using Modelo.TiposConsumo;

namespace Modelo.Pedidos
{
    public class Pedido
    {
        public int ID_Pedido { get; set; }
        public int ID_Sucursal { get; set; }
        public int ID_TipoConsumo { get; set; }
        public DateTime FechaPedido { get; set; }
        public TimeOnly HoraPedido { get; set; }
        public string? Cliente { get; set; }

        public Sucursal? ObjSucursal { get; set; }
        public TipoComsumo? ObjTipoConsumo { get; set; }
    }
}
