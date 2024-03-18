using Microsoft.AspNetCore.Identity;

namespace Presentacion.Models
{
    public class ApplicationUser : IdentityUser
    {
        public decimal Salario { get; set; }
        public bool EstadoContrato { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Genero { get; set; }
        public string Nacimiento { get; set; }
        public string Direccion { get; set; }


    }
}
