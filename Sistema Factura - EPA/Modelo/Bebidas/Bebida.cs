using Modelo.Productos;

namespace Modelo.Bebidas
{
    public class Bebida
    {
        public int ID_Bebida { get; set; }
        public int ID_Suministro { get; set; }
        public int ID_Producto { get; set; }
        public int ID_Categoria { get; set; }

        public Suministro? ObjSuministro { get; set; }
        public Producto? ObjProducto { get; set; }
        public Categorias? ObjCategorias { get; set; }

        public Inventario? ObjInventario { get; set; }
    }
}