using Datos.ConexionSQL;
using Modelo.Productos;
using Modelo.Promociones;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;

namespace Datos.PromocionCD
{
    public class PromocionCD
    {
        public static PromocionCD _instancia = null;

        public PromocionCD()
        {

        }

        public static PromocionCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new PromocionCD();
                }
                return _instancia;
            }
        }


        //Obtener Promociones
        public List<Promocion> ObtenerPromociones()
        {


            var rptListaPromocion = new List<Promocion>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPPromocion", oConexion);

                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaPromocion.Add(new Promocion()
                        {
                            ID_Promocion = Convert.ToInt32(dr["IdPromocion"].ToString()),
                            Nombre = dr["NombrePromocion"].ToString(),
                            Precio = Convert.ToDecimal(dr["PrecioPromocion"], new CultureInfo("es-PE")),
                            Dias = dr["DiasPromocion"].ToString(),
                            Estado = Convert.ToBoolean(dr["Estado"])
                            //ObjMenuPromocion = new MenuPromocion()
                            //{
                            //    Cantidad= Convert.ToInt32(dr["Cantidad"]),
                            //    ID_Producto = Convert.ToInt32(dr["IdProducto"])
                            //}

                        });
                    }
                    dr.Close();

                    return rptListaPromocion;

                }
                catch (Exception ex)
                {
                    rptListaPromocion = null;
                    return rptListaPromocion;
                }
            }


        }


        //Registrar Promocion
        public bool RegistrarPromocion(string Detalle)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarPromocion", oConexion);
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

        //fin Registrar

        //Obtener Productos de la promocion
        public List<Promocion> PromocionProducto(int IdPromocion)
        {
            var rptListaPromocionPRODUC = new List<Promocion>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPPromocionProductos", oConexion);
                cmd.Parameters.AddWithValue("PromocionId", IdPromocion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaPromocionPRODUC.Add(new Promocion()
                        {
                            ID_Promocion = Convert.ToInt32(dr["idPromocion"].ToString()),
                            Nombre = dr["Promocion"].ToString(),
                            Precio = Convert.ToDecimal(dr["Preciopromocion"], new CultureInfo("es-PE")),
                            Dias = dr["Dias"].ToString(),
                            Estado = Convert.ToBoolean(dr["estadoPromocion"]),
                            ObjMenuPromocion = new MenuPromocion()
                            {
                                Cantidad = Convert.ToInt32(dr["CantidadProducto"]),
                                ID_Producto = Convert.ToInt32(dr["IDProducto"]),
                                ID_Promocion = Convert.ToInt32(dr["IdPromocion"])
                            },
                            ObjProductos = new Producto()
                            {
                                Nombre = dr["Producto"].ToString()
                            }
                        });
                    }
                    dr.Close();

                    return rptListaPromocionPRODUC;

                }
                catch (Exception ex)
                {
                    rptListaPromocionPRODUC = null;
                    return rptListaPromocionPRODUC;
                }
            }

        }

        //Modificar Promocion
        public bool ModificarPromocion(string Detalle)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarPromocion", oConexion);
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


        //inicio eliminar
        public bool EliminarPromocion(int idPromo)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPEliminarPromocion", oConexion);
                    cmd.Parameters.AddWithValue("IdPromcion", idPromo);

                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Resultado"].Value);

                }
                catch
                {
                    respuesta = false;
                }

            }

            return respuesta;

        }


    }
}
