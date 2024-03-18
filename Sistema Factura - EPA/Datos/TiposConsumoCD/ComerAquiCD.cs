namespace Datos.TiposConsumoCD
{
    public class ComerAquiCD
    {
        public static ComerAquiCD _instancia = null;

        public ComerAquiCD()
        {

        }

        public static ComerAquiCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ComerAquiCD();
                }
                return _instancia;
            }
        }

        //Obtener 

        //Fin Obtner
    }
}
