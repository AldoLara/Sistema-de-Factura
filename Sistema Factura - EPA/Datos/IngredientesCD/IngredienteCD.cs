using Datos.ConexionSQL;
using Modelo.Bebidas;
using Modelo.Ingredientes;
using Modelo.Productos;
using System.Data;
using System.Data.SqlClient;

namespace Datos.IngredientesCD
{
    public class IngredienteCD
    {
        public static IngredienteCD _instancia = null;

        public IngredienteCD()
        {

        }

        public static IngredienteCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new IngredienteCD();
                }
                return _instancia;
            }
        }

        //Obtener Ingredientes
        public List<Ingrediente> ObtenerIngredientes()
        {
            var rptListaIngrediente = new List<Ingrediente>();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPIngrediente", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaIngrediente.Add(new Ingrediente()
                        {
                            ID_Ingrediente = Convert.ToInt32(dr["idIngrediente"]),
                            // FechaVencimineto = (DateTime)dr["fechaVencimiento"],
                            ID_Categoria = Convert.ToInt32(dr["categoriaId"]),
                            ID_Suministro = Convert.ToInt32(dr["suministroId"]),
                            ObjSuministro = new Suministro
                            {
                                Nombre = dr["nombreSuministro"].ToString(),
                                Descripcion = dr["descripcion"].ToString(),
                                Estado = Convert.ToBoolean(dr["estadoSuministro"])
                            },
                            ObjCategoria = new Categorias()
                            {
                                NombreCat = dr["nombreCategoria"].ToString()
                            }
                        });
                    }
                    dr.Close();

                    return rptListaIngrediente;
                }
                catch
                {
                    rptListaIngrediente = null;
                    return rptListaIngrediente;
                }
            }
        }

        //Fin Obtener

        //Registrar Ingrediente
        public bool RegistrarIngrediente(Ingrediente oIngrediente)
        {
            bool respuesta = true;

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {

                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarIngrediente", oConexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("NombreSuministro", oIngrediente.ObjSuministro.Nombre);
                    cmd.Parameters.AddWithValue("DescripcionSuministro", (object)oIngrediente.ObjSuministro.Descripcion ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("EstadoSuministro", oIngrediente.ObjSuministro.Estado);

                    // cmd.Parameters.AddWithValue("FechaVencimiento", oIngrediente.FechaVencimineto);

                    cmd.Parameters.AddWithValue("CategoriaId", oIngrediente.ID_Categoria);

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

        //Modificar Ingredientes
        public bool ModificarIngrediente(Ingrediente oIngrediente)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarIngrediente", oConexion);

                    cmd.Parameters.AddWithValue("IngredienteId", oIngrediente.ID_Ingrediente);
                    cmd.Parameters.AddWithValue("CategoriaId", oIngrediente.ID_Categoria);

                    cmd.Parameters.AddWithValue("NombreSuministro", oIngrediente.ObjSuministro.Nombre);
                    cmd.Parameters.AddWithValue("DescripcionSuministro", (object)oIngrediente.ObjSuministro.Descripcion ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("EstadoSuministro", oIngrediente.ObjSuministro.Estado);


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

        //Eliminar Ingredientes
        public bool EliminarIngrediente(int IdIngrediente)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPEliminarIngrediente", oConexion);
                    cmd.Parameters.AddWithValue("IngredienteId", IdIngrediente);
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
