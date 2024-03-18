using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Presentacion.Models;
using System.ComponentModel.DataAnnotations;

namespace Presentacion.Areas.Identity.Pages.Account.Manage
{
    public partial class IndexModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public IndexModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;

        }

        [Display(Name = "Usuario")]
        public string Username { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Phone]
            [Display(Name = "Telefono")]
            public string PhoneNumber { get; set; }

            /**********************************************/

            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Nombre")]
            public string FirstName { get; set; }

            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Apellido")]
            public string LastName { get; set; }

            [Display(Name = "Fecha Nacimiento")]
            public string DateOfBirth { get; set; }

            [Required]
            [Display(Name = "Sexo")]
            public string Gender { get; set; }



        }

        private async Task LoadAsync(ApplicationUser user)
        {
            Input = new InputModel();
            var userName = await _userManager.GetUserNameAsync(user);
            var phoneNumber = await _userManager.GetPhoneNumberAsync(user);
            var nombre = user.Nombre;
            var apellido = user.Apellido;
            var genero = user.Genero;
            var nacimiento = user.Nacimiento;


            Username = userName;
            Input.PhoneNumber = phoneNumber;

            if (nombre != null)
            {
                Input.FirstName = nombre;
            }

            if (apellido != null)
            {
                Input.LastName = apellido;
            }

            if (genero != null)
            {
                Input.Gender = genero;
            }

            if (nacimiento != null)
            {
                Input.DateOfBirth = nacimiento;
            }



        }



        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await LoadAsync(user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                await LoadAsync(user);
                return Page();
            }

            user.Nombre = Input.FirstName;
            user.Apellido = Input.LastName;
            user.Genero = Input.Gender;
            user.Nacimiento = Input.DateOfBirth;


            var phoneNumbers = await _userManager.GetPhoneNumberAsync(user);

            //if (Input.PhoneNumber != phoneNumbers)
            //{
            var setPhoneResult = await _userManager.SetPhoneNumberAsync(user, Input.PhoneNumber);
            if (!setPhoneResult.Succeeded)
            {
                StatusMessage = "A ocurrido un error al actualizar numero de Telefono.";
                return RedirectToPage();
            }
            //}


            await _signInManager.RefreshSignInAsync(user);
            StatusMessage = "Tu perfil se a actualizado correctamente";
            return RedirectToPage();
        }
    }
}
