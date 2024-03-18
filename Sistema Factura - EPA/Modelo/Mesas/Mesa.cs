namespace Modelo.Mesas
{
    public class Mesa
    {
        public int id { get; set; }
        public int sucursalId { get; set; }
        public string? nombre { get; set; }
        public int capacidad { get; set; }

        public bool estado { get; set; }

        public Sucursal? objSucursal { get; set; }
    }
}
