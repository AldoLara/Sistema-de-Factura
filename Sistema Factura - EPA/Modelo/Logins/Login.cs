using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Modelo.Logins
{
    public class Login
    {
        [Required(ErrorMessage = "Escriba un Email")]
        [EmailAddress]
        public string? Email { get; set; }

        [PasswordPropertyText]
        [Required(ErrorMessage = "Escriba una Contraseña")]
        public string? Password { get; set; }

    }
}
