namespace Modelo.Productos
{
    public class Suministro
    {
        public int ID_Suminstro { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public decimal PrecioCompra { get; set; }
        public DateTime FechaCaducidad { get; set; }
        public bool Estado { get; set; }
    }
}
