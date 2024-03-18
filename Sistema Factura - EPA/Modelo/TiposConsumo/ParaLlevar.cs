using Modelo.Empleados;

namespace Modelo.TiposConsumo
{
    public class ParaLlevar
    {
        public int ID_ParaLlevar { get; set; }
        public int ID_Empleado { get; set; }
        public int ID_TipoConsumo { get; set; }
        public Empleado? ObjEmpleado { get; set; }
        public TipoComsumo? ObjTipoConsumo { get; set; }
    }
}
