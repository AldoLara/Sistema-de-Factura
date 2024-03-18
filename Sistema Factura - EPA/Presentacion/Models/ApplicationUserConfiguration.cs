using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentacion.Models
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            // Renombrar la columna 'Id' a 'UsuarioId'
            builder.Property(u => u.Id).HasColumnName("UsuarioId");


            // Agregar la columna 'Genero' de tipo entero
            builder.Property(u => u.Genero).HasColumnType("nvarchar(max)");

            // Agregar la columna 'Nacimiento' de tipo entero
            builder.Property(u => u.Nacimiento).HasColumnType("nvarchar(max)");

            // Agregar la columna 'Salario' de tipo decimal(13,2)
            builder.Property(u => u.Salario).HasColumnType("decimal(13,2)");

            // Agregar la columna 'EstadoContrato' de tipo varchar(15)
            builder.Property(u => u.EstadoContrato).HasColumnType("bit");

        }
    }
}
