namespace Modelo.Facturas
{
    public class CambioMoneda
    {
        public int ID_CambioMoneda { get; set; }
        public int ID_Moneda { get; set; }
        public decimal Cambio { get; set; }
        public DateTime FechaRegistro { get; set; }
        public Moneda? ObjMoneda { get; set; }
    }
}
