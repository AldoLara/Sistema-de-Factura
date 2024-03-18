using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Presentacion.Models;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;

namespace Presentacion.Controllers.UsuarioControlador
{
    public class UsuarioController : Controller
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly IUserStore<ApplicationUser> _userStore;
        private readonly IUserEmailStore<ApplicationUser> _emailStore;
        private readonly RoleManager<UserRole> _managerRole;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public List<ApplicationUser> Users { get; set; }


        public UsuarioController(UserManager<ApplicationUser> usermanager,
             IUserStore<ApplicationUser> userStore,
             RoleManager<UserRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender)
        {
            this._userManager = usermanager;
            this._emailSender = emailSender;
            this._userStore = userStore;
            this._emailStore = GetEmailStore();
            this._managerRole = roleManager;
            this._signInManager = signInManager;
        }

        public class UserWithRoles
        {
            public string IdUser { get; set; }
            public string Rol { get; set; }
            public string RolId { get; set; }
            public string Nombre { get; set; }
            public string Apellido { get; set; }
            public string Clave { get; set; }
            public string Correo { get; set; }
            public bool Estado { get; set; }

        }

        [HttpGet]
        public IActionResult ViewUsuarios()
        {
            return View("~/Views/Usuarios/ViewUsuarios.cshtml");
        }



        public async Task<IActionResult> Obtener()
        {

            // Obtener la lista de usuarios
            var users = await _userManager.Users.ToListAsync();
            var userWithRoles = new List<UserWithRoles>();

            var userIdActual = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var superAdminRoleId = await _managerRole.FindByNameAsync("SuperAdmin");

            foreach (var user in users)
            {
                if (User.Identity.IsAuthenticated && User.Identity.Name != user.UserName &&
                    user.Id != userIdActual)
                {
                    var roles = await _userManager.GetRolesAsync(user);

                    if (roles.Count != 0 && !roles.Contains("SuperAdmin"))
                    {
                        string NombreRol = roles.FirstOrDefault();
                        UserRole rol = await _managerRole.FindByNameAsync(NombreRol);

                        userWithRoles.Add(new UserWithRoles
                        {
                            IdUser = user.Id,
                            Rol = NombreRol,
                            RolId = rol?.Id,
                            Nombre = user.Nombre,
                            Apellido = user.Apellido,
                            Clave = user.PasswordHash,
                            Estado = user.EstadoContrato,
                            Correo = user.Email
                        });
                    }
                }
            }

            return Json(new { data = userWithRoles });

        }


        //Get: User Actual
        public async Task<IActionResult> ObtenerUsuarioActual()
        {

            var user = await _userManager.GetUserAsync(User);
            var rol = await _userManager.GetRolesAsync(user);
            if (user != null)
            {
                var datos = new
                {
                    Id = user.Id,
                    Nombre = user.Nombre,
                    Apellido = user.Apellido,
                    Correo = user.Email,
                    Rol = rol
                };
                return Json(datos);
            }
            return NotFound("Usuario no encontrado");
        }


        public async Task<IActionResult> Guardar(ApplicationUser users, string role)
        {
            string returnUrl = null;
            returnUrl ??= Url.Content("~/");
            var resultado = false;
            if (users.Id == "0")
            {
                var userExist = await _userManager.FindByEmailAsync(users.Email);
                if (userExist != null)
                {
                    return Json(new { res = resultado });
                }


                try
                {
                    if (await _managerRole.RoleExistsAsync(role))
                    {

                        var user = CreateUser();
                        user.EstadoContrato = users.EstadoContrato;
                        if (user.EstadoContrato == true)
                        {
                            await _userManager.SetLockoutEnabledAsync(user, false);
                            await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.MaxValue);
                        }
                        else
                        {
                            await _userManager.SetLockoutEnabledAsync(user, true);
                            await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.MaxValue);

                        }

                        user.Nombre = users.Nombre;
                        user.Apellido = users.Apellido;

                        await _userStore.SetUserNameAsync(user, users.Email, CancellationToken.None);
                        await _emailStore.SetEmailAsync(user, users.Email, CancellationToken.None);
                        var result = await _userManager.CreateAsync(user, users.PasswordHash);
                        if (result.Succeeded)
                        {
                            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                            var callbackUrl = Url.Page(
                            "/Account/ConfirmEmail",
                            pageHandler: null,
                            values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                            protocol: Request.Scheme);

                            await _emailSender.SendEmailAsync(users.Email, "Confirma tu correo electrónico",
                            $"Confirma tu cuenta <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>haciendo clic aquí</a>.");

                            var res0 = await _userManager.AddToRoleAsync(user, role);
                            if (res0.Succeeded)
                                resultado = true;


                        }

                    }
                }
                catch (Exception)
                {

                    resultado = false;
                }

            }
            else
            {
                var userExist = await _userManager.FindByEmailAsync(users.Email);

                if (userExist == null)
                {
                    return Json(new { res = resultado });
                }

                userExist.EstadoContrato = users.EstadoContrato;
                if (userExist.EstadoContrato == true)
                {
                    await _userManager.SetLockoutEnabledAsync(userExist, false);
                    await _userManager.SetLockoutEndDateAsync(userExist, DateTimeOffset.MaxValue);
                }
                else
                {
                    await _userManager.SetLockoutEnabledAsync(userExist, true);
                    await _userManager.SetLockoutEndDateAsync(userExist, DateTimeOffset.MaxValue);
                }


                var setEmailResult = await _userManager.SetEmailAsync(userExist, userExist.Email);

                if (setEmailResult.Succeeded)
                {
                    var currentRoles = await _userManager.GetRolesAsync(userExist);

                    if (currentRoles.Any())
                    {
                        // Elimina al usuario de los roles actuales
                        foreach (var currentRole in currentRoles)
                        {
                            await _userManager.RemoveFromRoleAsync(userExist, currentRole);
                        }
                    }

                    // Agrega el usuario al nuevo rol
                    await _userManager.AddToRoleAsync(userExist, role);
                    resultado = true;
                }

            }
            var isLockedOut = await _userManager.IsLockedOutAsync(users);

            return Json(new { res = resultado });
        }











        private ApplicationUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<ApplicationUser>();
            }
            catch
            {
                throw new InvalidOperationException($"No se puede crear una instancia de '{nameof(ApplicationUser)}'. " +
                    $"Asegúrese de que '{nameof(ApplicationUser)}' no sea una clase abstracta y tenga un constructor sin parámetros, o alternativamente " +
                    $"anular la página de registro en /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        private IUserEmailStore<ApplicationUser> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("La interfaz de usuario predeterminada requiere un almacén de usuarios con soporte por correo electrónico.");
            }
            return (IUserEmailStore<ApplicationUser>)_userStore;
        }
    }
}
