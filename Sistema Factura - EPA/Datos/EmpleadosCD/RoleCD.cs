using Datos.ConexionSQL;
using Modelo.Empleados;
using System.Data;
using System.Data.SqlClient;


namespace Datos.EmpleadosCD
{
    public class RoleCD
    {
        public static RoleCD? _instancia = null;

        public RoleCD()
        {

        }

        public static RoleCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new RoleCD();
                }
                return _instancia;
            }
        }



        public List<Rol> ObtenerRol()
        {
            var rptListaRol = new List<Rol>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {  //                                Stored procedure

                SqlCommand cmd = new SqlCommand("SPRol", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaRol.Add(new Rol()
                        {
                            ID_Rol = dr["Id"].ToString(),
                            Nombre = dr["Name"].ToString(),
                            Estado = Convert.ToBoolean(dr["Estado"].ToString()),

                        });
                    }
                    dr.Close();

                    return rptListaRol;

                }
                catch
                {
                    rptListaRol = null;
                    return rptListaRol;
                }
            }
        }
        //fin listar

    }
}
