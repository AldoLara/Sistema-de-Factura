using Modelo.Productos;

namespace Modelo.Pedidos
{
    public class DetallePedido
    {
        public int ID_Pedido { get; set; }
        public int ID_Producto { get; set; }
        public int Cantidad { get; set; }

        public Pedido? ObjPedido { get; set; }
        public Producto? ObjProducto { get; set; }
    }
}
