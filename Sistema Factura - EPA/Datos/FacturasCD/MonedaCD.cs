namespace Datos.FacturasCD
{
    public class MonedaCD
    {
        public static MonedaCD _instancia = null;

        public MonedaCD()
        {

        }

        public static MonedaCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new MonedaCD();
                }
                return _instancia;
            }
        }

        //Obtener Monedas

        //Fin Obtner
    }
}
