using Datos.ConexionSQL;
using Modelo.Empleados;
using Modelo.Productos;
using System.Data;
using System.Data.SqlClient;
using System.Xml;
using System.Xml.Linq;

namespace Datos.EmpleadosCD
{
    public class EmpleadoCD
    {
        public static EmpleadoCD? _instancia = null;

        public EmpleadoCD()
        {

        }

        public static EmpleadoCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new EmpleadoCD();
                }
                return _instancia;
            }
        }

        //Obtener Empleado
        public Empleado GetEmpleado(string IdUsuario)
        {
            Empleado rptUsuario = new Empleado();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPObtenerDetalleUsuario", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("IdUsuario", IdUsuario);


                try
                {
                    oConexion.Open();
                    using (XmlReader dr = cmd.ExecuteXmlReader())
                    {
                        while (dr.Read())
                        {
                            XDocument doc = XDocument.Load(dr);
                            if (doc.Element("Usuario") != null)
                            {
                                rptUsuario.oListaMenu = (
                                    from menu in doc.Element("Usuario").Element("DetalleMenu").Elements("Menu")
                                    select new Menu()
                                    {
                                        Nombre = menu.Element("NombreMenu").Value,
                                        Icono = menu.Element("Icono").Value,
                                        oSubMenu = (
                                            from submenu in menu.Element("DetalleSubMenu").Elements("SubMenu")
                                            select new SubMenu()
                                            {
                                                Nombre = submenu.Element("NombreSubMenu").Value,
                                                Controlador = submenu.Element("Controlador").Value,
                                                Vista = submenu.Element("Vista").Value,
                                                Activo = (submenu.Element("Activo").Value.ToString() == "1" ? true : false),
                                            }
                                        ).ToList()
                                    }
                                ).ToList();
                            }

                            else
                            {
                                rptUsuario = null;
                            }
                        }

                        dr.Close();

                    }

                    return rptUsuario;
                }
                catch
                {
                    rptUsuario = null;
                    return rptUsuario;
                }
            }
        }

        //Fin Obtner
    }
}
