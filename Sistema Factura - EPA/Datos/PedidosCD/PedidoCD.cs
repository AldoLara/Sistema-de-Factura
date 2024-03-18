namespace Datos.PedidosCD
{
    public class PedidoCD
    {
        public static PedidoCD _instancia = null;

        public PedidoCD()
        {

        }

        public static PedidoCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new PedidoCD();
                }
                return _instancia;
            }
        }

        //Obtener Peidos

        //Fin Obtner
    }
}
