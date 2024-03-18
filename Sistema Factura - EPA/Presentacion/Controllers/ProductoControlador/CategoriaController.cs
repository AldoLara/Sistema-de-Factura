using Datos.BebidasCD;
using Microsoft.AspNetCore.Mvc;
using Modelo.Bebidas;

namespace Presentacion.Controllers.SuministroControlador
{

    public class CategoriaController : Controller
    {

        [HttpGet]
        public IActionResult ViewCategorias()
        {
            return View("~/Views/Productos/ViewCategorias.cshtml");
        }

        [HttpGet]
        public JsonResult Obtener()
        {
            List<Categorias> lista = CategoriasCD.Instancia.ObtenerCategoria();
            return Json(new { data = lista });

        }

        //inicio

        public JsonResult Guardar(Categorias objeto) // guardar uno nuevo o actualizar
        {
            bool respuesta = false;

            if (objeto.ID_Categoria == 0)
            {

                respuesta = CategoriasCD.Instancia.RegistrarCategoria(objeto);
            }

            else
            {
                respuesta = CategoriasCD.Instancia.ModificarCategoria(objeto);
            }
            return Json(new { resultado = respuesta });
        }
        //

        [HttpGet]
        //   [Authorize(Roles = "Admin")]
        public JsonResult Eliminar(int id = 0)
        {
            bool respuesta = CategoriasCD.Instancia.EliminarCategoria(id);
            return Json(new { resultado = respuesta });
        }


        //fin
    }
}
