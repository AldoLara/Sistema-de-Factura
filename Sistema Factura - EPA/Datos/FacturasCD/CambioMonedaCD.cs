namespace Datos.FacturasCD
{
    public class CambioMonedaCD
    {
        public static CambioMonedaCD? _instancia = null;

        public CambioMonedaCD()
        {

        }

        public static CambioMonedaCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CambioMonedaCD();
                }
                return _instancia;
            }
        }

        //Obtener Cambios de Moneda

        //Fin Obtner
    }
}
