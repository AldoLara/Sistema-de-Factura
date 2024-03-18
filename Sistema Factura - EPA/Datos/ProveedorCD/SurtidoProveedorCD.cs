namespace Datos.ProveedorCD
{
    public class SurtidoProveedorCD
    {
        public static SurtidoProveedorCD _instancia = null;

        public SurtidoProveedorCD()
        {

        }

        public static SurtidoProveedorCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new SurtidoProveedorCD();
                }
                return _instancia;
            }
        }




    }
}
