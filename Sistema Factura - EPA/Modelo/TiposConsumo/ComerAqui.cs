using Modelo.Empleados;
using Modelo.Mesas;

namespace Modelo.TiposConsumo
{
    public class ComerAqui
    {
        public int ID_ComerAqui { get; set; }
        public int ID_Empleado { get; set; }
        public int ID_Mesa { get; set; }
        public int ID_TipoConsumo { get; set; }

        public Empleado? ObjEmpleado { get; set; }
        public Mesa? ObjMesa { get; set; }
        public TipoComsumo? ObjTipoConsumo { get; set; }
    }
}
