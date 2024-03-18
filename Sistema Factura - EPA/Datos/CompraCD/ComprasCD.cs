using Datos.ConexionSQL;
using Modelo;
using Modelo.Compras;
using Modelo.Productos;
using Modelo.Proveedor;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Xml;
using System.Xml.Linq;

namespace Datos.CompraCD
{
    public class ComprasCD
    {
        public static ComprasCD? _instancia = null;

        public ComprasCD()
        {

        }

        public static ComprasCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ComprasCD();
                }
                return _instancia;
            }
        }


        public List<Compra> ObtenerListaCompra(DateTime? fechaInicio, DateTime? fechaFin, int idproveedor, int idtienda)
        {
            var rptListaCompra = new List<Compra>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPObtenerListaCompra", oConexion);
                cmd.Parameters.AddWithValue("FechaInicio", fechaInicio);
                cmd.Parameters.AddWithValue("FechaFin", fechaFin);
                cmd.Parameters.AddWithValue("IdProveedor", idproveedor);
                cmd.Parameters.AddWithValue("IdTienda", idtienda);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaCompra.Add(new Compra()
                        {
                            IdCompra = Convert.ToInt32(dr["IdCompra"].ToString()),
                            NumeroCompra = dr["NumeroCompra"].ToString(),
                            oProveedor = new Proveedores() { Nombre = dr["nombre"].ToString() },
                            oSucursal = new Sucursal() { NombreEmpresa = dr["nombreEmpresa"].ToString() },
                            FechaRegistro = dr["FechaCompra"].ToString(),
                            TotalCosto = Convert.ToDecimal(dr["TotalCosto"].ToString())
                        });
                    }
                    dr.Close();

                    return rptListaCompra;

                }
                catch (Exception ex)
                {
                    rptListaCompra = null;
                    return rptListaCompra;
                }
            }
        }
        //fin listar


        public Compra ObtenerDetalleCompra(int IdCompra)
        {
            Compra rptDetalleCompra = new Compra();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPObtenerDetalleCompra", oConexion);
                cmd.Parameters.AddWithValue("IdCompra", IdCompra);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    oConexion.Open();
                    using (XmlReader dr = cmd.ExecuteXmlReader())
                    {
                        while (dr.Read())
                        {
                            XDocument doc = XDocument.Load(dr);
                            if (doc.Element("DETALLE_COMPRA") != null)
                            {
                                rptDetalleCompra = (from dato in doc.Elements("DETALLE_COMPRA")
                                                    select new Compra()
                                                    {
                                                        IdCompra = Convert.ToInt32(dato.Element("Codigo").Value),
                                                        TotalCosto = Convert.ToDecimal(dato.Element("TotalCosto").Value, new CultureInfo("es-PE")),
                                                        FechaRegistro = dato.Element("FechaCompra").Value
                                                    }).FirstOrDefault();

                                rptDetalleCompra.oProveedor = (from dato in doc.Element("DETALLE_COMPRA").Elements("DETALLE_PROVEEDOR")
                                                               select new Proveedores()
                                                               {
                                                                   ID_Proveedor = Convert.ToInt32(dato.Element("proveedorId").Value),
                                                                   Nombre = dato.Element("nombre").Value,
                                                               }).FirstOrDefault();

                                rptDetalleCompra.oSucursal = (from dato in doc.Element("DETALLE_COMPRA").Elements("DETALLE_TIENDA")
                                                              select new Sucursal()
                                                              {
                                                                  ID_Sucursal = Convert.ToInt32(dato.Element("id").Value),
                                                                  NombreEmpresa = dato.Element("nombreEmpresa").Value,
                                                                  Direccion = dato.Element("direccion").Value
                                                              }).FirstOrDefault();

                                rptDetalleCompra.oListaDetalleCompra = (from producto in doc.Element("DETALLE_COMPRA").Element("DETALLE_PRODUCTO").Elements("PRODUCTO")
                                                                        select new DetalleCompra()
                                                                        {
                                                                            Cantidad = int.Parse(producto.Element("Cantidad").Value),
                                                                            ObjSuministro = new Suministro()
                                                                            {
                                                                                Nombre = producto.Element("NombreProducto").Value,
                                                                                PrecioCompra = Convert.ToDecimal(producto.Element("PrecioUnitarioCompra").Value, new CultureInfo("es-PE"))
                                                                            },
                                                                            TotalCosto = int.Parse(producto.Element("Cantidad").Value) * Convert.ToDecimal(producto.Element("PrecioUnitarioCompra").Value, new CultureInfo("es-PE"))
                                                                        }).ToList();

                            }
                            else
                            {
                                rptDetalleCompra = null;
                            }
                        }

                        dr.Close();

                    }

                    return rptDetalleCompra;
                }
                catch (Exception ex)
                {
                    rptDetalleCompra = null;
                    return rptDetalleCompra;
                }
            }

        }

        //Guardar
        public bool RegistrarCompra(string Detalle)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarCompra", oConexion);
                    cmd.Parameters.Add("Detalle", SqlDbType.Xml).Value = Detalle;
                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Resultado"].Value);

                }
                catch (Exception ex)
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }
    }
}
