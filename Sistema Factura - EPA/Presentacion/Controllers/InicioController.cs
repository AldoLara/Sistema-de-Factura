using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Presentacion.Models;
using System.Diagnostics;

namespace Presentacion.Controllers
{
    public class InicioController : Controller
    {
        private readonly ILogger<InicioController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        public InicioController(ILogger<InicioController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            this._userManager = userManager;
        }

        public async Task<IActionResult> IndexAsync()
        {
            string apellido = "";
            string nombre = "";
            string userName = _userManager.GetUserName(this.User);
            if (userName != null)
            {
                var user = await _userManager.FindByNameAsync(userName);

                if (user != null)
                {
                    nombre = user.Nombre;
                    apellido = user.Apellido;
                    ViewData["Nombre"] = nombre;
                    ViewData["Apellido"] = apellido;
                }
            }
            return View();
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
