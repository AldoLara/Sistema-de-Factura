using Microsoft.AspNetCore.Mvc;

namespace Presentacion.Controllers.UsuarioControlador
{
    public class UsuarioIndexController : Controller
    {
        [HttpGet]
        public IActionResult ViewUsuarioIndex()
        {
            return View("~/Views/Usuarios/ViewUsuarioIndex.cshtml");
        }
    }
}
