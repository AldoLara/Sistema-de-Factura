using Datos.ConexionSQL;
using Modelo.TiposConsumo;
using System.Data;
using System.Data.SqlClient;

namespace Datos.TiposConsumoCD
{
    public class TipoConsumoCD
    {
        public static TipoConsumoCD _instancia = null;

        public TipoConsumoCD()
        {

        }

        public static TipoConsumoCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new TipoConsumoCD();
                }
                return _instancia;
            }
        }

        //Obtener tipos de Consumo
        public List<TipoComsumo> ObtenerTiposConsumo()
        {
            var rptConsumo = new List<TipoComsumo>();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPTConsumo", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptConsumo.Add(new TipoComsumo()
                        {
                            ID_TipoConsumo = Convert.ToInt32(dr["id"]),
                            Tipo = dr["tipo"].ToString(),
                            Estado = Convert.ToBoolean(dr["estado"])
                        });
                    }

                    return rptConsumo;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                    return null;
                }
            }
        }
        //Fin Obtner

        public bool ModificarTipoConsumo(TipoComsumo oTConsumo)
        {
            bool respuesta = true;


            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarTConsumo", oConexion);
                    cmd.Parameters.AddWithValue("Id", oTConsumo.ID_TipoConsumo);
                    cmd.Parameters.AddWithValue("Estado", oTConsumo.Estado);
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
