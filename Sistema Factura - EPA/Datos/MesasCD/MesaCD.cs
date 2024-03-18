using Datos.ConexionSQL;
using Modelo.Mesas;
using System.Data;
using System.Data.SqlClient;

namespace Datos.MesasCD
{
    public class MesaCD
    {
        public static MesaCD? _instancia = null;

        public MesaCD()
        {

        }

        public static MesaCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new MesaCD();
                }
                return _instancia;
            }
        }


        public List<Mesa> ObtenerMesa()
        {
            var rptListaMesa = new List<Mesa>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {  //                                Stored procedure

                SqlCommand cmd = new SqlCommand("SPMesa", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaMesa.Add(new Mesa()
                        {
                            id = Convert.ToInt32(dr["id"].ToString()),
                            nombre = dr["nombre"].ToString(),
                            capacidad = Convert.ToInt32(dr["capacidad"].ToString()),
                            estado = Convert.ToBoolean(dr["estado"].ToString()),

                            sucursalId = Convert.ToInt32(dr["sucursalId"].ToString()),
                            /* objSucursal = new Sucursal() { NombreEmpresa = dr["nombreEmpresa"].ToString() }*/
                        });
                    }
                    dr.Close();

                    return rptListaMesa;

                }
                catch
                {
                    rptListaMesa = null;
                    return rptListaMesa;
                }
            }
        }
        //fin listar


        //INICIO REGISTRAR
        public bool RegistrarMesa(Mesa oMesa)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarMesa", oConexion);
                    cmd.Parameters.AddWithValue("Nombre", oMesa.nombre);
                    cmd.Parameters.AddWithValue("Capacidad", oMesa.capacidad);

                    cmd.Parameters.AddWithValue("Estado", oMesa.estado);
                    cmd.Parameters.AddWithValue("Sucursal", oMesa.sucursalId);

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

        public bool ModificarMesa(Mesa oMesa)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarMesa", oConexion);
                    cmd.Parameters.AddWithValue("IdMesa", oMesa.id);
                    cmd.Parameters.AddWithValue("Nombre", oMesa.nombre);
                    cmd.Parameters.AddWithValue("Capacidad", oMesa.capacidad);

                    cmd.Parameters.AddWithValue("Estado", oMesa.estado);
                    cmd.Parameters.AddWithValue("Sucursal", oMesa.sucursalId);
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
        public bool EliminarMesa(int IdMesa)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPEliminarMesa", oConexion);
                    cmd.Parameters.AddWithValue("cod", IdMesa);

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
