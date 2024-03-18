namespace Datos.TiposConsumoCD
{
    public class DomicilioCD
    {
        public static DomicilioCD _instancia = null;

        public DomicilioCD()
        {

        }

        public static DomicilioCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new DomicilioCD();
                }
                return _instancia;
            }
        }

        //Obtener

        //Fin Obtner
    }
}
