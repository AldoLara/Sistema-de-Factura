using Datos.ConexionSQL;
using Modelo.Comidas;
using Modelo.Productos;
using System.Data;
using System.Data.SqlClient;

namespace Datos.ComidasCD
{
    public class ComidaCD
    {
        public static ComidaCD? _instancia = null;

        private ComidaCD()
        {

        }
        public static ComidaCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ComidaCD();
                }
                return _instancia;
            }
        }

        //Obtener Comidas
        public List<Comida> ObtenerComidas()
        {
            var rptListaComida = new List<Comida>();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPComida", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaComida.Add(new Comida()
                        {
                            ID_Comida = Convert.ToInt32(dr["idComida"]),
                            ID_Producto = Convert.ToInt32(dr["productoId"]),
                            Descripcion = dr["descripcionComida"].ToString(),
                            ObjProducto = new Producto()
                            {
                                ID_Producto = Convert.ToInt32(dr["productoId"]),
                                Nombre = dr["nombreProducto"].ToString(),
                                Precio = Convert.ToDecimal(dr["precioProducto"].ToString()),
                                Estado = Convert.ToBoolean(dr["estadoProducto"])
                            }
                        });
                    }
                    dr.Close();

                    return rptListaComida;
                }
                catch
                {
                    rptListaComida = null;
                    return rptListaComida;
                }
            }
        }

        //Fin Obtener

        //Registrar Comida
        public bool RegistrarComida(Comida oComida)
        {
            bool respuesta = true;

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarComida", oConexion);
                    cmd.CommandType = CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("NombreProducto", oComida.ObjProducto.Nombre);
                    cmd.Parameters.AddWithValue("PrecioProducto", oComida.ObjProducto.Precio);
                    cmd.Parameters.AddWithValue("EstadoProducto", oComida.ObjProducto.Estado);

                    cmd.Parameters.AddWithValue("DescripcionComida", oComida.Descripcion);

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

        //Modificar Comidas
        public bool ModificarComida(Comida oComida)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarComida", oConexion);

                    cmd.Parameters.AddWithValue("ProductoId", oComida.ID_Producto);
                    cmd.Parameters.AddWithValue("NombreProducto", oComida.ObjProducto.Nombre);
                    cmd.Parameters.AddWithValue("PrecioProducto", oComida.ObjProducto.Precio);
                    cmd.Parameters.AddWithValue("EstadoProducto", oComida.ObjProducto.Estado);

                    cmd.Parameters.AddWithValue("ComidaId", oComida.ID_Comida);
                    cmd.Parameters.AddWithValue("DescripcionComida", oComida.Descripcion);

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

        //Eliminar Comidas
        public bool EliminarComida(int IdComida)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPEliminarComida", oConexion);
                    cmd.Parameters.AddWithValue("ComidaId", IdComida);
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
    }
}
