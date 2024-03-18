namespace Datos.FacturasCD
{
    public class FacturaCD
    {
        public static FacturaCD? _instancia = null;

        public FacturaCD()
        {

        }

        public static FacturaCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new FacturaCD();
                }
                return _instancia;
            }
        }

        //Obtener Facturas

        //Fin Obtner
    }
}
