using Datos.ConexionSQL;
using Modelo.Ingredientes;
using Modelo.InventarioBebidas;
using Modelo.Productos;

using System.Data;
using System.Data.SqlClient;

namespace Datos.InventarioBebidasCD
{
    public class InventarioBebidasCD
    {
        public static InventarioBebidasCD _instancia = null;

        public InventarioBebidasCD()
        {

        }

        public static InventarioBebidasCD Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new InventarioBebidasCD();
                }
                return _instancia;
            }
        }

        //Obtener Ingredientes
        public List<InventarioBebidas> ObtenerInventarioBebidas()
        {
            var rptListaIngrediente = new List<InventarioBebidas>();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                SqlCommand cmd = new SqlCommand("SPInventarioBebida", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaIngrediente.Add(new InventarioBebidas()
                        {
                            // Tabla Inventario
                            IdInventario = Convert.ToInt32(dr["id"]),
                            Cantidad = Convert.ToInt32(dr["cantidad"]),

                            // Tabla suministro
                            ObjSuministro = new Suministro
                            {
                                Nombre = Convert.ToString(dr["nombreSuministro"]),
                                Descripcion = dr["descripcion"].ToString(),
                                FechaCaducidad = (DateTime)dr["FechaCaducidad"],
                                PrecioCompra = Convert.ToDecimal(dr["precioCompra"]),
                                Estado = Convert.ToBoolean(dr["estadoSuministro"])

                            },

                            ////Tabla Proveedores
                            //ObjProveedor = new Proveedores()
                            //{
                            //    Nombre = dr["nombre"].ToString()
                            //},

                            ////Tabla Compra
                            //ObjCompra = new Compra()
                            //{
                            //    FechaRegistro = dr["FechaRegistro"].ToString()
                            //},
                            //Tabla Productos
                            ObjProdBebida = new Producto()
                            {
                                Precio = Convert.ToInt32(dr["precioProducto"])
                            },
                            ////Tabla Categorias
                            //ObjCat = new Categorias()
                            //{
                            //    NombreCat = dr["nombre"].ToString()
                            //},
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

        public bool ControlarStock(int IdProducto, int Cantidad, bool Restar)
        {


            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("StockControlar", oConexion);
                    cmd.Parameters.AddWithValue("IdProducto_", IdProducto);
                    cmd.Parameters.AddWithValue("Cantidad_", Cantidad);
                    cmd.Parameters.AddWithValue("Restar_", Restar);
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
