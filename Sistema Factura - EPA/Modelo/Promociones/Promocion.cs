using Modelo.Productos;

namespace Modelo.Promociones
{
    public class Promocion
    {
        public int ID_Promocion { get; set; }
        public string? Nombre { get; set; }
        public decimal Precio { get; set; }
        public string? Dias { get; set; }
        public bool Estado { get; set; }
        public MenuPromocion? ObjMenuPromocion { get; set; }
        public Producto? ObjProductos { get; set; }
        public int Cantidad { get; set; }
        public float ImporteTotalPromo { get; set; }
        public string? TextoPrecio { get; set; }
        public string? TextoImporte { get; set; }
    }
}
