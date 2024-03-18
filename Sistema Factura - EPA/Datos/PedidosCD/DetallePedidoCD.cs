namespace Datos.PedidosCD
{
    public class DetallePedidoCD
    {
        public static DetallePedidoCD _instancia = null;

        public DetallePedidoCD()
        {

        }

        public static DetallePedidoCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new DetallePedidoCD();
                }
                return _instancia;
            }
        }

        //Obtener DEtalles de Pedido

        //Fin Obtner
    }
}
