using Datos.ConexionSQL;
using Modelo;
using System.Data;
using System.Data.SqlClient;

namespace Datos
{
    public class SucursalCD
    {
        public static SucursalCD _instancia = null;

        private SucursalCD()
        {

        }
        public static SucursalCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new SucursalCD();
                }
                return _instancia;
            }
        }

        //Obtener
        public async Task<List<Sucursal>> ObtenerSucursalAsync()
        {
            var rptSucursal = new List<Sucursal>();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPSucursal", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await oConexion.OpenAsync();
                    SqlDataReader dr = await cmd.ExecuteReaderAsync();

                    while (await dr.ReadAsync())
                    {
                        rptSucursal.Add(new Sucursal()
                        {
                            ID_Sucursal = Convert.ToInt32(dr["id"]),
                            NombreEmpresa = dr["nombreEmpresa"].ToString(),
                            Direccion = dr["direccion"].ToString(),
                            Municipio = dr["municipio"].ToString(),
                            Departamento = dr["departamento"].ToString(),
                            NumTelefono = dr["numTelefono"].ToString()
                        });
                    }

                    return rptSucursal;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                    return null;
                }
            }
        }
        //Fin Obtener

        //Registrar
        public bool RegistrarSucursal(Sucursal oSucursal)
        {
            bool respuesta = true;


            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarSucursal", oConexion);
                    cmd.Parameters.AddWithValue("Nombre", oSucursal.NombreEmpresa);
                    cmd.Parameters.AddWithValue("Direccion", oSucursal.Direccion);
                    cmd.Parameters.AddWithValue("Municipio", oSucursal.Municipio);
                    cmd.Parameters.AddWithValue("Departamento", oSucursal.Departamento);
                    cmd.Parameters.AddWithValue("Telefono", oSucursal.NumTelefono);
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


        //Modificar Sucursal
        public async Task<bool> ModificarSucursalAsync(Sucursal oSucursal)
        {
            bool respuesta = true;


            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarSucursal", oConexion);
                    cmd.Parameters.AddWithValue("Id", oSucursal.ID_Sucursal);
                    cmd.Parameters.AddWithValue("Nombre", oSucursal.NombreEmpresa);
                    cmd.Parameters.AddWithValue("Direccion", oSucursal.Direccion);
                    cmd.Parameters.AddWithValue("Municipio", oSucursal.Municipio);
                    cmd.Parameters.AddWithValue("Departamento", oSucursal.Departamento);
                    cmd.Parameters.AddWithValue("Telefono", oSucursal.NumTelefono);
                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    await oConexion.OpenAsync();

                    await cmd.ExecuteNonQueryAsync();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Resultado"].Value);
                }
                catch (Exception ex)
                {
                    respuesta = false;
                    // Manejo de excepciones, puedes agregar registros de log o tomar otras acciones necesarias.
                }
            }

            return respuesta;
        }

        //Fin modificar



    }
}
