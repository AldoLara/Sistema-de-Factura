using Datos.ConexionSQL;
using Modelo.Proveedor;
using System.Data;
using System.Data.SqlClient;

namespace Datos.ProveedorCD
{
    public class ProveedoresCD
    {
        public static ProveedoresCD _instancia = null;

        public ProveedoresCD()
        {

        }

        public static ProveedoresCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ProveedoresCD();
                }
                return _instancia;
            }
        }
        //inicio listar
        public List<Proveedores> ObtenerProveedor()
        {
            var rptListaProveedor = new List<Proveedores>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {  //                                Stored procedure

                SqlCommand cmd = new SqlCommand("SPProveedor", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaProveedor.Add(new Proveedores()
                        {
                            ID_Proveedor = Convert.ToInt32(dr["proveedorId"].ToString()),
                            Nombre = dr["Nombre"].ToString(),
                            Direccion = dr["Direccion"].ToString(),
                            Telefono = dr["Telefono"].ToString(),
                            Estado = Convert.ToBoolean(dr["estado"].ToString())
                        });
                    }
                    dr.Close();

                    return rptListaProveedor;

                }
                catch
                {
                    rptListaProveedor = null;
                    return rptListaProveedor;
                }
            }
        }
        //fin listar


        //INICIO REGISTRAR
        public bool RegistrarProveedor(Proveedores oProveedor)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPRegistrarProveedor", oConexion);
                    cmd.Parameters.AddWithValue("Nombre", oProveedor.Nombre);
                    cmd.Parameters.AddWithValue("Direccion", oProveedor.Direccion);
                    cmd.Parameters.AddWithValue("Telefono", oProveedor.Telefono);
                    cmd.Parameters.AddWithValue("Estado_", oProveedor.Estado);

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

        public bool ModificarProveedor(Proveedores oProveedor)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPModificarProveedor", oConexion);
                    cmd.Parameters.AddWithValue("IdProveedor", oProveedor.ID_Proveedor);
                    cmd.Parameters.AddWithValue("Nombre", oProveedor.Nombre);
                    cmd.Parameters.AddWithValue("Direccion", oProveedor.Direccion);
                    cmd.Parameters.AddWithValue("Telefono", oProveedor.Telefono);
                    cmd.Parameters.AddWithValue("Estado", oProveedor.Estado);
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
        public bool EliminarProveedor(int IdProveedor)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SPEliminarProveedor", oConexion);
                    cmd.Parameters.AddWithValue("cod", IdProveedor);

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
