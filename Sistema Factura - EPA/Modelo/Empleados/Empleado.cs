
using Modelo.Productos;

namespace Modelo.Empleados
{
    public class Empleado
    {
        public string ID_Empleado { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public Rol? oRol { get; set; }
        public Sucursal? oTienda { get; set; }
        public List<Menu>? oListaMenu { get; set; }

    }
}
