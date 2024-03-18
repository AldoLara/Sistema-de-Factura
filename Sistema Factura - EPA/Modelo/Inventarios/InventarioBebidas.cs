using Modelo.Bebidas;
using Modelo.Compras;
using Modelo.Productos;
using Modelo.Proveedor;

namespace Modelo.InventarioBebidas
{
    public class InventarioBebidas
    {
        //Inventario
        public int IdInventario { get; set; }
        public int Cantidad { get; set; }
        //Suministro
        public Suministro? ObjSuministro { get; set; }
        //Bebida
        public Producto? ObjProdBebida { get; set; }
        //Proveedores
        public Proveedores? ObjProveedor { get; set; }
        ////Detalle Compra
        //public DetalleCompra? ObjDetalleCompra { get; set; }
        //Compra
        public Compra? ObjCompra { get; set; }
        //Categoria
        public Categorias? ObjCat { get; set; }

    }
}
