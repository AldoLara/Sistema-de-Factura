using Datos.EmpleadosCD;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Identity;
using Modelo.Productos;
using Presentacion.Models;
using System.Text;

namespace Presentacion.Helpers
{
    public static class Helpers
    {
        public static IHtmlContent ActionLinkAllow(this Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper helper)
        {
            var sb = new StringBuilder();

            var userManager = helper.ViewContext.HttpContext.RequestServices.GetService(typeof(UserManager<ApplicationUser>)) as UserManager<ApplicationUser>;

            var usuarioActual = userManager.GetUserAsync(helper.ViewContext.HttpContext.User).Result;

            if (usuarioActual != null)
            {
                var rptUsuario = EmpleadoCD.Instancia.GetEmpleado(usuarioActual.Id);
                List<Menu> menusMismoNombre = new List<Menu>();


                foreach (var item in rptUsuario.oListaMenu)
                {
                    foreach (var subitem in item.oSubMenu)
                    {
                        if (subitem.Nombre == item.Nombre)
                        {
                            menusMismoNombre.Add(item);
                            sb.AppendLine($"<a href='/" + subitem.Controlador + "/" + subitem.Vista + "' class='nav__link'>");
                            sb.AppendLine($"<i class='{item.Icono} nav__icon'></i>");
                            sb.AppendLine($"<span class='nav__name'>{item.Nombre}</span>");
                            sb.AppendLine("</a>");
                        }
                    }
                }
                foreach (var item in rptUsuario.oListaMenu)
                {
                    if (!menusMismoNombre.Contains(item))
                    {
                        sb.AppendLine("<div class='nav__dropdown'>");
                        sb.AppendLine($"<a href='#' class='nav__link'>");
                        sb.AppendLine($"<i class='{item.Icono} nav__icon'></i>");
                        sb.AppendLine($"<span class='nav__name'>{item.Nombre}</span>");
                        sb.AppendLine("<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>");
                        sb.AppendLine("</a>");

                        sb.AppendLine("<div class='nav__dropdown-collapse'>");
                        sb.AppendLine("<div class='nav__dropdown-content'>");

                        foreach (var subitem in item.oSubMenu)
                        {
                            if (subitem.Activo == true && subitem.Nombre != item.Nombre)
                            {
                                sb.AppendLine($"<a class='nav__dropdown-item' href='/" + subitem.Controlador + "/" + subitem.Vista + "'>" + subitem.Nombre + "</a>");
                            }
                        }
                        sb.AppendLine("</div>");
                        sb.AppendLine("</div>");
                        sb.AppendLine("</div>");

                    }
                }


            }

            return new HtmlString(sb.ToString());
        }
    }
}
