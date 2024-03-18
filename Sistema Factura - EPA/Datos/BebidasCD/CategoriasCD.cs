using Datos.ConexionSQL;
using Modelo.Bebidas;
using System.Data;
using System.Data.SqlClient;

namespace Datos.BebidasCD
{
    public class CategoriasCD
    {
        public static CategoriasCD? _instancia = null;

        private CategoriasCD()
        {

        }
        public static CategoriasCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CategoriasCD();
                }
                return _instancia;
            }
        }

        //inicio listar
        public List<Categorias> ObtenerCategoria()
        {
            var rptListaCategoria = new List<Categorias>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {  //                                Stored procedure

                SqlCommand cmd = new SqlCommand("SPCategoria", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaCategoria.Add(new Categorias()
                        {
                            ID_Categoria = Convert.ToInt32(dr["id"].ToString()),
                            NombreCat = dr["nombre"].ToString(),
                            Estado = Convert.ToBoolean(dr["estado"].ToString())
                        });
                    }
                    dr.Close();

                    return rptListaCategoria;

                }
                catch
                {
                    rptListaCategoria = null;
                    return rptListaCategoria;
                }
            }
        }
        //fin listar


        //INICIO REGISTRAR
        public bool RegistrarCategoria(Categorias oCategoria)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarCat", oConexion);
                    cmd.Parameters.AddWithValue("Nombre", oCategoria.NombreCat);
                    cmd.Parameters.AddWithValue("Activo_", oCategoria.Estado);

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

        //FIN registrar 


        //Inicio modificar

        public bool ModificarCategoria(Categorias oCategoria)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarCat", oConexion);
                    cmd.Parameters.AddWithValue("@IdCategoria", oCategoria.ID_Categoria);
                    cmd.Parameters.AddWithValue("@NombreCat", oCategoria.NombreCat);
                    cmd.Parameters.AddWithValue("Activo", oCategoria.Estado);
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

        //fin mmodificar <<--!



        //inicio eliminar
        public bool EliminarCategoria(int IdCategoria)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPEliminarCat", oConexion);
                    cmd.Parameters.AddWithValue("cod", IdCategoria);

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

        //fin eliminar
    }
}
