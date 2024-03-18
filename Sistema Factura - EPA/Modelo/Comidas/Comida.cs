using Modelo.Productos;

namespace Modelo.Comidas
{
    public class Comida
    {
        public int ID_Comida { get; set; }
        public int ID_Producto { get; set; }
        public string? Descripcion { get; set; }

        public Producto? ObjProducto { get; set; }
    }
}
