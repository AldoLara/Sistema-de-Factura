namespace Datos.FacturasCD
{
    public class TipoPagoCD
    {
        public static TipoPagoCD _instancia = null;

        public TipoPagoCD()
        {

        }

        public static TipoPagoCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new TipoPagoCD();
                }
                return _instancia;
            }
        }

        //Obtener Tipos de Pago

        //Fin Obtner
    }
}
