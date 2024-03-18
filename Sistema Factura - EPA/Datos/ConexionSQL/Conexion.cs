using Microsoft.Extensions.Configuration;

namespace Datos.ConexionSQL
{
    public static class Conexion
    {
        public static string CadenaConexion()
        {
            string result = "false";
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));

            var root = builder.Build();
            var CN = root.GetConnectionString("Defaultconnection");

            // Verificar si CN es nulo y proporcionar un valor predeterminado si es necesario
            if (CN != null)
            {
                return CN;
            }
            else
            {
                return result;
            }
        }
    }

}
