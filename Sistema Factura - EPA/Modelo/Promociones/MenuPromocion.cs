using Modelo.Productos;

namespace Modelo.Promociones
{
    public class MenuPromocion
    {
        public int ID_MenuPromocion { get; set; }
        public int ID_Producto { get; set; }
        public int ID_Promocion { get; set; }
        public int Cantidad { get; set; }

        public Producto? ObjProducto { get; set; }
        public Promocion? ObjPromocion { get; set; }
    }
}
