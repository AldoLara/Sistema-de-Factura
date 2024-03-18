namespace Modelo.Mesas
{
    public class UnionMesa
    {
        public int ID_UnionMesa { get; set; }
        public int ID_Mesa { get; set; }
        public string? Nombre { get; set; }

        public Mesa? ObjMesa { get; set; }
    }
}
