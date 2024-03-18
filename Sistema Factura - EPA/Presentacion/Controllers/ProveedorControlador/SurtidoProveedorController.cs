using Microsoft.AspNetCore.Mvc;

namespace Presentacion.Controllers.ProveedorControlador
{
    public class SurtidoProveedorController : Controller
    {
        public IActionResult ViewSurtidosProveedores()
        {
            return View("~/Views/Proveedores/ViewSurtidosProveedores.cshtml");
        }
    }
}
