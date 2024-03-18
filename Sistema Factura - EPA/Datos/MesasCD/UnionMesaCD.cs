namespace Datos.MesasCD
{
    public class UnionMesaCD
    {
        public static UnionMesaCD? _instancia = null;

        public UnionMesaCD()
        {

        }

        public static UnionMesaCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new UnionMesaCD();
                }
                return _instancia;
            }
        }

        //Obtener Mesas

        //Fin Obtner
    }
}
