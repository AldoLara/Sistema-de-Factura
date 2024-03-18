namespace Modelo.Productos
{
    public class Inventario
    {
        public int ID_Inventario { get; set; }
        public int ID_Sucursal { get; set; }
        public int ID_Suministro { get; set; }
        public decimal Cantidad { get; set; }
    }
}
