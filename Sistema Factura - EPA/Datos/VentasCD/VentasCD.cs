using Datos.ConexionSQL;
using Modelo;
using Modelo.Empleados;
using Modelo.Promociones;
using Modelo.Venta;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Xml;
using System.Xml.Linq;

namespace Datos.VentasCD
{
    public class VentasCD
    {
        public static VentasCD? _instancia = null;

        public VentasCD()
        {

        }

        public static VentasCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new VentasCD();
                }
                return _instancia;
            }
        }


        public int RegistrarVenta(String Detalle)
        {
            int respuesta = 0;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("RegistrarVenta", oConexion);
                    cmd.Parameters.Add("Detalle", SqlDbType.Xml).Value = Detalle;
                    cmd.Parameters.Add("Resultado", SqlDbType.Int).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToInt32(cmd.Parameters["Resultado"].Value);

                }
                catch (Exception ex)
                {
                    respuesta = 0;
                }
            }
            return respuesta;
        }


        //Detalles de Venta

        public Venta ObtenerDetalleVenta(int IdVenta)
        {
            Venta? rptDetalleVenta = new Venta();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPObtenerDetalleVenta", oConexion);
                cmd.Parameters.AddWithValue("IdVenta", IdVenta);
                cmd.CommandType = CommandType.StoredProcedure;

                var NuevaCultura = CultureInfo.GetCultureInfo("es-PE");
                try
                {
                    oConexion.Open();
                    using (XmlReader dr = cmd.ExecuteXmlReader())
                    {
                        while (dr.Read())
                        {
                            XDocument doc = XDocument.Load(dr);
                            if (doc.Element("DETALLE_VENTA") != null)
                            {
                                rptDetalleVenta = (from dato in doc.Elements("DETALLE_VENTA")
                                                   select new Venta()
                                                   {
                                                       Cliente = dato.Element("NombreCliente").Value,
                                                       TipoPago = dato.Element("TipoPago").Value,
                                                       Codigo = dato.Element("Codigo").Value,
                                                       TotalCosto = decimal.Parse(dato.Element("TotalCosto").Value, NuevaCultura),
                                                       ImporteRecibido = decimal.Parse(dato.Element("ImporteRecibido").Value, NuevaCultura),
                                                       ImporteCambio = decimal.Parse(dato.Element("ImporteCambio").Value, NuevaCultura),
                                                       Descuento = decimal.Parse(dato.Element("Descuento").Value, NuevaCultura),
                                                       FechaRegistro = dato.Element("FechaRegistro").Value
                                                   }).FirstOrDefault();
                                rptDetalleVenta.oEmpleado = (from dato in doc.Element("DETALLE_VENTA").Elements("DETALLE_USUARIO")
                                                             select new Empleado()
                                                             {
                                                                 Nombre = dato.Element("Nombre").Value,
                                                                 Apellido = dato.Element("Apellido").Value,
                                                             }).FirstOrDefault();
                                rptDetalleVenta.oSucursal = (from dato in doc.Element("DETALLE_VENTA").Elements("DETALLE_TIENDA")
                                                             select new Sucursal()
                                                             {
                                                                 NumTelefono = dato.Element("numTelefono").Value,
                                                                 NombreEmpresa = dato.Element("nombreEmpresa").Value,
                                                                 Direccion = dato.Element("Direccion").Value
                                                             }).FirstOrDefault();
                                rptDetalleVenta.oListaPromocion = (from promo in doc.Element("DETALLE_VENTA").Elements("DETALLE_PROMOCION").Elements("PROMOCION")
                                                                   select new Promocion()
                                                                   {
                                                                       Cantidad = int.TryParse(promo.Element("CantPromocion").Value, out int cant) ? cant : 0,
                                                                       Nombre = promo.Element("nombre").Value,
                                                                       Precio = decimal.TryParse(promo.Element("PrecioUnidadPromo").Value, NumberStyles.Float, NuevaCultura, out decimal precio) ? precio : 0,
                                                                       ImporteTotalPromo = float.TryParse(promo.Element("ImporteTotalPromo").Value, NumberStyles.Float, NuevaCultura, out float importe) ? importe : 0
                                                                   }).ToList();


                                var detalleVentaElement = doc.Element("DETALLE_VENTA");
                                var detalleProductoElement = detalleVentaElement?.Element("DETALLE_PRODUCTO");

                                if (detalleVentaElement != null && detalleProductoElement != null)
                                {
                                    rptDetalleVenta.oListaDetalleVenta = (from producto in detalleProductoElement.Elements("PRODUCTO")
                                                                          where producto != null
                                                                          select new DetalleVenta()
                                                                          {
                                                                              Cantidad = int.Parse(producto.Element("Cantidad")?.Value ?? "0"),
                                                                              NombreProducto = producto.Element("NombreProducto")?.Value,
                                                                              PrecioUnidad = float.Parse(producto.Element("PrecioUnidad")?.Value ?? "0", NuevaCultura),
                                                                              ImporteTotal = float.Parse(producto.Element("ImporteTotal")?.Value ?? "0", NuevaCultura)
                                                                          }).ToList();
                                }
                            }
                            else
                            {
                                rptDetalleVenta = null;
                            }
                        }

                        dr.Close();

                    }

                    return rptDetalleVenta;
                }
                catch (Exception ex)
                {
                    rptDetalleVenta = null;
                    return rptDetalleVenta;
                }
            }
        }


        //Obtener Lista de Ventas
        public List<Venta> ObtenerListaVenta(string Codigo, DateTime FechaInicio, DateTime FechaFin, string Nombre)
        {
            List<Venta>? rptListaVenta = new List<Venta>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPObtenerListaVenta", oConexion);
                cmd.Parameters.AddWithValue("@Codigo", Codigo);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@Nombre", Nombre);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaVenta.Add(new Venta()
                        {
                            IdVenta = Convert.ToInt32(dr["IdVenta"].ToString()),
                            Codigo = dr["Codigo"].ToString(),
                            FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                            VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                            Cliente = dr["NombreCliente"].ToString(),//cliente
                            TotalCosto = decimal.Parse(dr["TotalCoste"].ToString()),
                            Descuento = decimal.Parse(dr["Descuento"].ToString()),
                            TipoPago = dr["TipoPago"].ToString()
                        });
                    }
                    dr.Close();

                    return rptListaVenta;

                }
                catch (Exception ex)
                {
                    rptListaVenta = null;
                    return rptListaVenta;
                }
            }

        }

    }
}
