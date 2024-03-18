using Microsoft.AspNetCore.Identity;

namespace Presentacion.Models
{
    public class UserRole : IdentityRole
    {
        public bool Estado { get; set; }
    }
}
