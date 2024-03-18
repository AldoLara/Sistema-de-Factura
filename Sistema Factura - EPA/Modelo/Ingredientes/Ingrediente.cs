using Modelo.Bebidas;
using Modelo.Productos;

namespace Modelo.Ingredientes
{
    public class Ingrediente
    {
        public int ID_Ingrediente { get; set; }
        public int ID_Categoria { get; set; }
        public int ID_Suministro { get; set; }
        public DateTime FechaVencimineto { get; set; }

        public Categorias? ObjCategoria { get; set; }
        public Suministro? ObjSuministro { get; set; }
    }
}
