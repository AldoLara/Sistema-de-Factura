using Datos;
using Datos.TiposConsumoCD;
using Microsoft.AspNetCore.Mvc;
using Modelo;
using Modelo.TiposConsumo;
namespace Presentacion.Controllers
{
    public class SucursalController : Controller
    {
        //[Authorize(Roles = "User")]
        public IActionResult ViewSucursal()
        {
            return View();
        }

        //Mostrar Datos de la empresa
        [HttpGet]
        public async Task<JsonResult> Obtener()
        {
            List<Sucursal> lista = await SucursalCD.Instancia.ObtenerSucursalAsync();
            return Json(new { data = lista });
        }

        //Obtener Tipos de Consumo
        [HttpGet]
        public JsonResult ObtenerTConsumo()
        {
            List<TipoComsumo> lista = TipoConsumoCD.Instancia.ObtenerTiposConsumo();
            return Json(new { data = lista });
        }


        //Modificar sucursal
        public async Task<JsonResult> Guardar(Sucursal objeto)
        {
            bool respuesta = false;
            if (objeto.ID_Sucursal == 0)
            {
                respuesta = SucursalCD.Instancia.RegistrarSucursal(objeto);
            }
            else
            {
                respuesta = await SucursalCD.Instancia.ModificarSucursalAsync(objeto);

            }

            return Json(new { resultado = respuesta });
        }


        //Modificar sucursal
        public JsonResult ModificarCosumo(TipoComsumo objeto)
        {
            bool respuesta = false;

            respuesta = TipoConsumoCD.Instancia.ModificarTipoConsumo(objeto);

            return Json(new { resultado = respuesta });
        }

    }
}