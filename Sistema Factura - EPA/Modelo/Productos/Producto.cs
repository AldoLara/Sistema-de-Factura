namespace Modelo.Productos
{
    public class Producto
    {
        public int ID_Producto { get; set; }
        public string? Nombre { get; set; }
        public decimal? Precio { get; set; }
        public bool Estado { get; set; }
        public string? BebidaID { get; set; }
    }
}
