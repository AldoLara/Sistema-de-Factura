namespace Modelo.Venta
{
    public class DetalleVenta
    {
        public int Cantidad { get; set; }
        public string NombreProducto { get; set; }
        public float PrecioUnidad { get; set; }
        public string TextoPrecioUnidad { get; set; }
        public float ImporteTotal { get; set; }
        public string TextoImporteTotal { get; set; }
    }
}
