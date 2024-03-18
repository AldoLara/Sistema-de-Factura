using Datos.ConexionSQL;
using Modelo.Reportes;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;

namespace Datos.ReportesCD
{
    public class ReporteCD
    {
        public static ReporteCD _instancia = null;

        private ReporteCD()
        {

        }


        //Clases
        public class ReporteVentaProducto
        {
            public string Codigo { get; set; }
            public string Producto { get; set; }
            public string CantidadVendida { get; set; }
            public string Total { get; set; }
        }

        public class ReporteIngrediente
        {
            public string IdInventario { get; set; }
            public string CantidadUsada { get; set; }
            public string FechaInicio { get; set; }
            public string FechaCierre { get; set; }
            public string NombreIngrediente { get; set; }
        }


        public class ReporteCompra
        {
            public string Codigo { get; set; }
            public string Fecha { get; set; }
            public string Proveedor { get; set; }
            public string Total { get; set; }
        }


        public static ReporteCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ReporteCD();
                }
                return _instancia;
            }
        }

        /*======== REPORTES VENTAS ==========*/
        //Reportes de Ventas
        public List<ReporteVenta> ReporteVenta(DateTime FechaInicio, DateTime FechaFin, int IdTienda, int cierre)
        {
            List<ReporteVenta> lista = new List<ReporteVenta>();

            NumberFormatInfo formato = new CultureInfo("es-PE").NumberFormat;
            formato.CurrencyGroupSeparator = ".";

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPrptVenta", oConexion);
                cmd.Parameters.AddWithValue("FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("IdTienda", IdTienda);
                cmd.Parameters.AddWithValue("Cierre", cierre);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            lista.Add(new ReporteVenta()
                            {
                                FechaVenta = dr["Fecha Venta"].ToString(),
                                NumeroDocumento = dr["Numero Documento"].ToString(),
                                NombreEmpleado = dr["Nombre Empleado"].ToString(),
                                CantidadUnidadesVendidas = dr["Cantidad Unidades Vendidas"].ToString(),
                                CantidadProductos = dr["Cantidad Productos"].ToString(),
                                TotalVenta = Convert.ToDecimal(dr["Total Venta"].ToString(), new CultureInfo("es-PE")).ToString("N2", formato)
                            });
                        }

                    }

                }
                catch (Exception ex)
                {
                    lista = new List<ReporteVenta>();
                }
            }

            return lista;

        }

        //Reporte de Productos por ventas
        public List<ReporteVentaProducto> ObtenerReporteVentaProducto(DateTime FechaInicio, DateTime FechaFin, int cierre)
        {
            List<ReporteVentaProducto> lista = new List<ReporteVentaProducto>();

            NumberFormatInfo formato = new CultureInfo("es-PE").NumberFormat;
            formato.CurrencyGroupSeparator = ".";

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPrptVentaProducto", oConexion);
                cmd.Parameters.AddWithValue("FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("Cierre", cierre);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            lista.Add(new ReporteVentaProducto()
                            {
                                Codigo = dr["Codigo"].ToString(),
                                Producto = dr["Producto"].ToString(),
                                CantidadVendida = dr["CantidadVendida"].ToString(),
                                Total = Convert.ToDecimal(dr["Total"].ToString(), new CultureInfo("es-PE")).ToString("N2", formato),
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Manejar la excepción según tus necesidades
                    Console.WriteLine(ex.Message);
                    lista = new List<ReporteVentaProducto>();
                }
            }

            return lista;
        }



        // Cierre de ventas
        public List<ReporteVentaProducto> ObtenerCierreVentaProducto()
        {
            List<ReporteVentaProducto> lista = new List<ReporteVentaProducto>();


            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPCierreVenta", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter resultadoParam = new SqlParameter("@Resultado", SqlDbType.Int);
                resultadoParam.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(resultadoParam);

                try
                {
                    oConexion.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            lista.Add(new ReporteVentaProducto()
                            {
                                Codigo = dr["Codigo"].ToString(),
                                Producto = dr["Producto"].ToString(),
                                CantidadVendida = dr["CantidadVendida"].ToString()
                            });
                        }
                    }

                    // Verificar el resultado del procedimiento almacenado
                    int resultado = Convert.ToInt32(resultadoParam.Value);
                    if (resultado != 1)
                    {
                        // Manejar el resultado del procedimiento almacenado según sea necesario
                        Console.WriteLine("Error al ejecutar el procedimiento almacenado.");
                    }
                }
                catch (Exception ex)
                {
                    // Manejar la excepción según tus necesidades
                    Console.WriteLine(ex.Message);
                    lista = new List<ReporteVentaProducto>();
                }
            }

            return lista;
        }


        public List<ReporteIngrediente> ObtenerCierreIngrediente(String Detalle)
        {

            List<ReporteIngrediente> lista = new List<ReporteIngrediente>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPCierreIngredientes", oConexion);
                cmd.Parameters.Add("Detalle", SqlDbType.Xml).Value = Detalle;
                cmd.Parameters.Add("Resultado", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {


                    oConexion.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            lista.Add(new ReporteIngrediente()
                            {
                                IdInventario = dr["IdInventario"].ToString(),
                                CantidadUsada = dr["CantidadUsada"].ToString(),
                                FechaInicio = dr["FechaInicio"].ToString(),
                                FechaCierre = dr["FechaCierre"].ToString(),
                                NombreIngrediente = dr["nombre"].ToString()
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    lista = new List<ReporteIngrediente>();
                }
            }
            return lista;
        }


        public List<ReporteIngrediente> CierreIngredienteVerificar(int cierre, DateTime fecha)
        {
            fecha = Convert.ToDateTime( "1/1/1753");

            List<ReporteIngrediente> lista = new List<ReporteIngrediente>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPCierreIngredientesVerificar", oConexion);
                cmd.Parameters.AddWithValue("Cierre", cierre);
                cmd.Parameters.AddWithValue("FeCierre", fecha);
                cmd.Parameters.Add("Resultado", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {

                    oConexion.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            lista.Add(new ReporteIngrediente()
                            {
                                IdInventario = dr["IdInventario"].ToString(),
                                CantidadUsada = dr["CantidadUsada"].ToString(),
                                FechaInicio = dr["FechaInicio"].ToString(),
                                FechaCierre = dr["FechaCierre"].ToString(),
                                NombreIngrediente = dr["nombre"].ToString()
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    lista = new List<ReporteIngrediente>();
                }
            }
            return lista;
        }


        /*======== FIN REPORTES VENTAS ==========*/


        /*======== REPORTES COMPRAS ==========*/
        public List<ReporteCompra> ObtenerReporteCompra(DateTime FechaInicio, DateTime FechaFin)
        {
            List<ReporteCompra> lista = new List<ReporteCompra>();

            NumberFormatInfo formato = new CultureInfo("es-PE").NumberFormat;
            formato.CurrencyGroupSeparator = " ";

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPrptCompra", oConexion);
                cmd.Parameters.AddWithValue("FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("FechaFin", FechaFin);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            lista.Add(new ReporteCompra()
                            {
                                Codigo = dr["Numero Documento"].ToString(),
                                Fecha = dr["Fecha Venta"].ToString(),
                                Proveedor = dr["Proveedor"].ToString(),
                                Total = Convert.ToDecimal(dr["Total Compra"].ToString()).ToString("N2", formato)
                            });
                        }

                    }

                }
                catch (Exception ex)
                {
                    lista = new List<ReporteCompra>();
                }
            }

            return lista;

        }
    }
}
