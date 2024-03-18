namespace Datos
{
    public class MedidaCD
    {
        public static MedidaCD _instancia = null;

        private MedidaCD()
        {

        }
        public static MedidaCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new MedidaCD();
                }
                return _instancia;
            }
        }

        //Obtener Medidas

        //Fin Obtener
    }
}
