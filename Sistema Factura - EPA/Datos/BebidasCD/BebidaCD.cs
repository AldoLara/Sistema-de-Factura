using Datos.ConexionSQL;
using Modelo.Bebidas;
using Modelo.Productos;
using System.Data;
using System.Data.SqlClient;

namespace Datos.BebidasCD
{
    public class BebidaCD
    {
        public static BebidaCD? _instancia = null;

        private BebidaCD()
        {

        }
        public static BebidaCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new BebidaCD();
                }
                return _instancia;
            }
        }

        //Obtener Bebidas
        public List<Bebida> ObtenerBebidas(int iventario)
        {
            var rptListaBebida = new List<Bebida>();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPBebida", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Inventario", iventario);

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        Bebida bebida = new Bebida()
                        {
                            ID_Bebida = Convert.ToInt32(dr["idBebida"]),
                            ID_Suministro = Convert.ToInt32(dr["suministroId"]),
                            ID_Producto = Convert.ToInt32(dr["productoId"]),
                            ID_Categoria = Convert.ToInt32(dr["categoriaId"]),
                            ObjSuministro = new Suministro()
                            {
                              
                                Nombre = dr["nombreSuministro"].ToString(),
                                Descripcion = dr["descripcion"].ToString(),
                                PrecioCompra = (dr["precioCompra"] != DBNull.Value) ? Convert.ToDecimal(dr["precioCompra"]) : 0,
                                FechaCaducidad = Convert.ToDateTime(dr["FechaCaducidad"]),
                                Estado = Convert.ToBoolean(dr["estadoSuministro"])
                            },
                            ObjProducto = new Producto()
                            {
                                Nombre = dr["nombreProducto"].ToString(),
                                Precio = (dr["precioProducto"] != DBNull.Value) ? Convert.ToDecimal(dr["precioProducto"]) : 0,
                            },
                            ObjCategorias = new Categorias()
                            {
                                NombreCat = dr["nombreCategoria"].ToString()
                            }
                        };

                        // Condición para agregar ObjInventario si iventario es igual a 1
                        if (iventario == 1)
                        {
                            bebida.ObjInventario = new Inventario()
                            {
                                Cantidad = (dr["Stock"] != DBNull.Value) ? Convert.ToDecimal(dr["Stock"]) : 0

                            };
                        }

                        // Agregar la bebida a la lista
                        rptListaBebida.Add(bebida);
                    }

                    dr.Close();

                    return rptListaBebida;
                }
                catch
                {
                    rptListaBebida = null;
                    return rptListaBebida;
                }
            }
        }

        //Fin Obtener

        //Registrar Bebida
        public bool RegistrarBebida(Bebida oBebida)
        {
            bool respuesta = true;

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarBebida", oConexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("NombreSuministro", oBebida.ObjSuministro.Nombre);
                    cmd.Parameters.AddWithValue("DescripcionSuministro", (object)oBebida.ObjSuministro.Descripcion ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("EstadoSuministro", oBebida.ObjSuministro.Estado);

                    cmd.Parameters.AddWithValue("NombreProducto", oBebida.ObjSuministro.Nombre);
                    cmd.Parameters.AddWithValue("EstadoProducto", oBebida.ObjSuministro.Estado);

                    cmd.Parameters.AddWithValue("CategoriaId", oBebida.ID_Categoria);

                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;

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

        //fin Registrar

        //Modificar Bebidas
        public bool ModificarBebida(Bebida oBebida)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarBebida", oConexion);

                    cmd.Parameters.AddWithValue("SuministroId", oBebida.ID_Suministro);
                    cmd.Parameters.AddWithValue("NombreSuministro", oBebida.ObjSuministro.Nombre);
                    cmd.Parameters.AddWithValue("DescripcionSuministro", (object)oBebida.ObjSuministro.Descripcion ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("EstadoSuministro", oBebida.ObjSuministro.Estado);

                    cmd.Parameters.AddWithValue("NombreProducto", oBebida.ObjSuministro.Nombre);

                    cmd.Parameters.AddWithValue("CategoriaId", oBebida.ID_Categoria);
                    cmd.Parameters.AddWithValue("BebidaId", oBebida.ID_Bebida);

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

        //Eliminar Bebidas
        public bool EliminarBebida(int IdBebida)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPEliminarBebida", oConexion);
                    cmd.Parameters.AddWithValue("BebidaId", IdBebida);
                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Resultado"].Value);

                }
                catch (global::System.Exception)
                {
                    respuesta = false;


                }

            }

            return respuesta;

        }
        //Fin Obtener



    }
}