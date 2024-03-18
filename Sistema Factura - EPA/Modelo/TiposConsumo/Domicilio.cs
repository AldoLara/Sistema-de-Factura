using Modelo.Empleados;

namespace Modelo.TiposConsumo
{
    public class Domicilio
    {
        public int ID_Domicilio { get; set; }
        public int ID_Empleado { get; set; }
        public int ID_TipoConsumo { get; set; }
        public TimeOnly TiempoEntrega { get; set; }
        public decimal GastoEnvio { get; set; }

        public Empleado? ObjEmpleado { get; set; }
        public TipoComsumo? ObjTipoConsumo { get; set; }
    }
}
