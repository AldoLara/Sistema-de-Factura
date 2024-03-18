namespace Datos.TiposConsumoCD
{
    public class ParaLlevarCD
    {
        public static ParaLlevarCD _instancia = null;

        public ParaLlevarCD()
        {

        }

        public static ParaLlevarCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ParaLlevarCD();
                }
                return _instancia;
            }
        }

        //Obtener

        //Fin Obtner
    }
}
