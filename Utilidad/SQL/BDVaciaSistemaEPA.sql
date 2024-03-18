USE [master]
GO
/****** Object:  Database [EPA]    Script Date: 14/02/2024 14:34:06 ******/
CREATE DATABASE [EPA]
GO
USE [EPA]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bebida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bebida](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[suministroId] [int] NOT NULL,
	[productoId] [int] NOT NULL,
	[categoriaId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CambioMoneda]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CambioMoneda](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[monedaId] [int] NULL,
	[Cambio] [decimal](18, 2) NULL,
	[FechaRegistro] [date] NULL,
 CONSTRAINT [PK_CambioMoneda] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categorias]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorias](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[estado] [bit] NULL,
 CONSTRAINT [PK_Categorias] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CierreIngrediente]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CierreIngrediente](
	[CantidadUsada] [decimal](18, 2) NULL,
	[IdInventario] [int] NULL,
	[FechaInicio] [date] NULL,
	[FechaCierre] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comida](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](150) NULL,
	[productoId] [int] NOT NULL,
 CONSTRAINT [PK__Comida__3213E83F9043FEB0] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ__Comida__69E6E155E37B44AA] UNIQUE NONCLUSTERED 
(
	[productoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Compra]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Compra](
	[IdCompra] [int] IDENTITY(1,1) NOT NULL,
	[IdSucursal] [nvarchar](450) NOT NULL,
	[IdProveedor] [int] NOT NULL,
	[TotalCosto] [decimal](13, 2) NOT NULL,
	[Estado] [bit] NOT NULL,
	[FechaRegistro] [datetime] NOT NULL,
 CONSTRAINT [PK_Compra] PRIMARY KEY CLUSTERED 
(
	[IdCompra] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetalleCompra]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetalleCompra](
	[IdDetalleCompra] [int] IDENTITY(1,1) NOT NULL,
	[SuministroId] [int] NOT NULL,
	[IdCompra] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_DetalleCompra_1] PRIMARY KEY CLUSTERED 
(
	[IdDetalleCompra] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetalleVenta]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetalleVenta](
	[IdDetalleVenta] [int] IDENTITY(1,1) NOT NULL,
	[IdVenta] [int] NOT NULL,
	[IdPromocion] [int] NULL,
	[IdProducto] [int] NULL,
	[Cantidad] [int] NOT NULL,
	[PrecioUnitario] [int] NOT NULL,
	[ImporteTotal] [decimal](18, 0) NOT NULL,
	[Estado] [bit] NULL,
	[FechRegistro] [date] NULL,
 CONSTRAINT [PK_DetalleVenta] PRIMARY KEY CLUSTERED 
(
	[IdDetalleVenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ingrediente]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ingrediente](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fechaVencimiento] [datetime] NULL,
	[categoriaId] [int] NOT NULL,
	[suministroId] [int] NOT NULL,
 CONSTRAINT [PK__Ingredie__3213E83F3A58E403] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inventario]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inventario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sucursalId] [nvarchar](450) NULL,
	[suministroId] [int] NULL,
	[cantidad] [decimal](12, 2) NOT NULL,
 CONSTRAINT [PK__Inventar__3213E83F399B97BB] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medidas]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medidas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[medida] [nvarchar](50) NULL,
 CONSTRAINT [PK_Medidas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Menu]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[IdMenu] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](60) NULL,
	[Icono] [varchar](60) NULL,
	[Activo] [bit] NULL,
	[FechaRegistro] [datetime] NULL,
 CONSTRAINT [PK__Menu__4D7EA8E1C37ACEA9] PRIMARY KEY CLUSTERED 
(
	[IdMenu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Menu_Promociones]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu_Promociones](
	[productoId] [int] NOT NULL,
	[promocionesId] [int] NOT NULL,
	[cantidad] [decimal](12, 2) NULL,
 CONSTRAINT [PK_Menu_Promociones] PRIMARY KEY CLUSTERED 
(
	[productoId] ASC,
	[promocionesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mesa]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mesa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NULL,
	[capacidad] [int] NOT NULL,
	[estado] [bit] NULL,
	[sucursalId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK__Mesa__3BF2F4CAE952A65D] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Moneda]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Moneda](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[estado] [bit] NULL,
	[fechaRegistro] [date] NULL,
 CONSTRAINT [PK_Moneda] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permisos]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permisos](
	[IdPermisos] [int] IDENTITY(1,1) NOT NULL,
	[IdRol] [nvarchar](450) NULL,
	[IdSubMenu] [int] NULL,
	[Activo] [bit] NULL,
	[FechaRegistro] [datetime] NULL,
 CONSTRAINT [PK__PERMISOS__CE7ED38DB02D58A5] PRIMARY KEY CLUSTERED 
(
	[IdPermisos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[precio] [decimal](13, 2) NULL,
	[estado] [bit] NULL,
 CONSTRAINT [PK__Producto__3213E83FDC90C319] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ__Producto__72AFBCC6934190C2] UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Promociones]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Promociones](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](max) NULL,
	[precio] [decimal](18, 2) NULL,
	[estado] [bit] NULL,
	[dias] [nvarchar](max) NULL,
 CONSTRAINT [PK_Promociones] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proveedores]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proveedores](
	[proveedorId] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NULL,
	[direccion] [nvarchar](50) NULL,
	[telefono] [nvarchar](40) NULL,
	[estado] [bit] NULL,
 CONSTRAINT [PK_Proveedores] PRIMARY KEY CLUSTERED 
(
	[proveedorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoleClaims]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_RoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[Discriminator] [nvarchar](max) NOT NULL,
	[Estado] [bit] NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubMenu]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubMenu](
	[IdSubMenu] [int] IDENTITY(1,1) NOT NULL,
	[IdMenu] [int] NULL,
	[Nombre] [varchar](60) NULL,
	[Controlador] [varchar](60) NULL,
	[Vista] [varchar](50) NULL,
	[Activo] [bit] NULL,
	[FechaRegistro] [datetime] NULL,
 CONSTRAINT [PK__SubMenu__CFDCE01AB3785703] PRIMARY KEY CLUSTERED 
(
	[IdSubMenu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sucursal]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sucursal](
	[id] [nvarchar](450) NOT NULL,
	[nombreEmpresa] [varchar](60) NULL,
	[direccion] [nvarchar](50) NULL,
	[municipio] [nvarchar](50) NULL,
	[departamento] [nvarchar](50) NULL,
	[numTelefono] [varchar](20) NULL,
 CONSTRAINT [PK__Sucursal__3213E83F1C80BA9C] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suministro]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suministro](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](20) NOT NULL,
	[descripcion] [nvarchar](50) NULL,
	[estado] [bit] NULL,
	[precioCompra] [decimal](12, 2) NULL,
	[FechaCaducidad] [datetime] NULL,
 CONSTRAINT [PK__Suminist__3213E83F0096EAF6] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ__Suminist__72AFBCC6D84B8934] UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tipo_Consumo]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tipo_Consumo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tipo] [varchar](15) NOT NULL,
	[estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[tipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tipo_Pago]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tipo_Pago](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tipo] [varchar](30) NOT NULL,
	[estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[tipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Union_Mesa]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Union_Mesa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[mesaId] [int] NULL,
	[nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_Union_Mesa] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[UsuarioId] [nvarchar](450) NOT NULL,
	[Salario] [decimal](13, 2) NOT NULL,
	[EstadoContrato] [bit] NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[Apellido] [nvarchar](max) NULL,
	[Nombre] [nvarchar](max) NULL,
	[Genero] [nvarchar](max) NULL,
	[Nacimiento] [nvarchar](max) NULL,
	[Direccion] [nvarchar](max) NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[UsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuariosClaims]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuariosClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_UsuariosClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuariosLogins]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuariosLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_UsuariosLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuariosRoles]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuariosRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_UsuariosRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuariosTokens]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuariosTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_UsuariosTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Venta]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Venta](
	[IdVenta] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](100) NULL,
	[ValorCodigo] [int] NULL,
	[IdMesa] [int] NULL,
	[IdSucursal] [nvarchar](450) NOT NULL,
	[Usuario] [nvarchar](450) NOT NULL,
	[NombreCliente] [nvarchar](50) NULL,
	[CantidadProducto] [int] NULL,
	[CantidadTotal] [int] NOT NULL,
	[TotalCoste] [decimal](18, 0) NOT NULL,
	[ImporteRecibido] [decimal](18, 0) NULL,
	[ImporteCambio] [decimal](18, 0) NULL,
	[IdTipoConsumo] [int] NULL,
	[Descuento] [decimal](18, 2) NULL,
	[TipoPago] [nvarchar](50) NULL,
	[Estado] [bit] NULL,
	[FechaRegistro] [date] NULL,
	[FechaCierre] [datetime] NULL,
 CONSTRAINT [PK_Venta] PRIMARY KEY CLUSTERED 
(
	[IdVenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CambioMoneda] ADD  CONSTRAINT [DF_CambioMoneda_FechaRegistro]  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[Compra] ADD  CONSTRAINT [DF_Compra_FechaRegistro]  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[Menu] ADD  CONSTRAINT [DF__Menu__Activo__6BE40491]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Menu] ADD  CONSTRAINT [DF__Menu__FechaRegis__6CD828CA]  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[Moneda] ADD  CONSTRAINT [DF_Moneda_fechaRegistro]  DEFAULT (getdate()) FOR [fechaRegistro]
GO
ALTER TABLE [dbo].[Permisos] ADD  CONSTRAINT [DF__PERMISOS__Activo__7A3223E8]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Permisos] ADD  CONSTRAINT [DF__PERMISOS__FechaR__7B264821]  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (N'') FOR [Discriminator]
GO
ALTER TABLE [dbo].[SubMenu] ADD  CONSTRAINT [DF__SubMenu__Activo__74794A92]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[SubMenu] ADD  CONSTRAINT [DF__SubMenu__FechaRe__756D6ECB]  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[Suministro] ADD  CONSTRAINT [DF_Suministro_FechaCaducidad]  DEFAULT (getdate()) FOR [FechaCaducidad]
GO
ALTER TABLE [dbo].[Bebida]  WITH NOCHECK ADD  CONSTRAINT [FK__Bebida__producto__0F624AF8] FOREIGN KEY([productoId])
REFERENCES [dbo].[Producto] ([id])
GO
ALTER TABLE [dbo].[Bebida] CHECK CONSTRAINT [FK__Bebida__producto__0F624AF8]
GO
ALTER TABLE [dbo].[Bebida]  WITH NOCHECK ADD  CONSTRAINT [FK__Bebida__suminist__10566F31] FOREIGN KEY([suministroId])
REFERENCES [dbo].[Suministro] ([id])
GO
ALTER TABLE [dbo].[Bebida] CHECK CONSTRAINT [FK__Bebida__suminist__10566F31]
GO
ALTER TABLE [dbo].[Bebida]  WITH NOCHECK ADD  CONSTRAINT [FK_Bebida_Categorias] FOREIGN KEY([categoriaId])
REFERENCES [dbo].[Categorias] ([id])
GO
ALTER TABLE [dbo].[Bebida] CHECK CONSTRAINT [FK_Bebida_Categorias]
GO
ALTER TABLE [dbo].[CambioMoneda]  WITH NOCHECK ADD  CONSTRAINT [FK_CambioMoneda_Moneda] FOREIGN KEY([monedaId])
REFERENCES [dbo].[Moneda] ([id])
GO
ALTER TABLE [dbo].[CambioMoneda] CHECK CONSTRAINT [FK_CambioMoneda_Moneda]
GO
ALTER TABLE [dbo].[Comida]  WITH NOCHECK ADD  CONSTRAINT [FK__Comida__producto__14270015] FOREIGN KEY([productoId])
REFERENCES [dbo].[Producto] ([id])
GO
ALTER TABLE [dbo].[Comida] CHECK CONSTRAINT [FK__Comida__producto__14270015]
GO
ALTER TABLE [dbo].[Compra]  WITH NOCHECK ADD  CONSTRAINT [FK_Compra_Proveedores] FOREIGN KEY([IdProveedor])
REFERENCES [dbo].[Proveedores] ([proveedorId])
GO
ALTER TABLE [dbo].[Compra] CHECK CONSTRAINT [FK_Compra_Proveedores]
GO
ALTER TABLE [dbo].[Compra]  WITH NOCHECK ADD  CONSTRAINT [FK_Compra_Sucursal] FOREIGN KEY([IdSucursal])
REFERENCES [dbo].[Sucursal] ([id])
GO
ALTER TABLE [dbo].[Compra] CHECK CONSTRAINT [FK_Compra_Sucursal]
GO
ALTER TABLE [dbo].[DetalleCompra]  WITH NOCHECK ADD  CONSTRAINT [FK_DetalleCompra_Compra] FOREIGN KEY([IdCompra])
REFERENCES [dbo].[Compra] ([IdCompra])
GO
ALTER TABLE [dbo].[DetalleCompra] CHECK CONSTRAINT [FK_DetalleCompra_Compra]
GO
ALTER TABLE [dbo].[DetalleCompra]  WITH NOCHECK ADD  CONSTRAINT [FK_DetalleCompra_Suministro] FOREIGN KEY([SuministroId])
REFERENCES [dbo].[Suministro] ([id])
GO
ALTER TABLE [dbo].[DetalleCompra] CHECK CONSTRAINT [FK_DetalleCompra_Suministro]
GO
ALTER TABLE [dbo].[DetalleVenta]  WITH CHECK ADD  CONSTRAINT [FK_DetalleVenta_Producto] FOREIGN KEY([IdProducto])
REFERENCES [dbo].[Producto] ([id])
GO
ALTER TABLE [dbo].[DetalleVenta] CHECK CONSTRAINT [FK_DetalleVenta_Producto]
GO
ALTER TABLE [dbo].[DetalleVenta]  WITH CHECK ADD  CONSTRAINT [FK_DetalleVenta_Promociones] FOREIGN KEY([IdPromocion])
REFERENCES [dbo].[Promociones] ([id])
GO
ALTER TABLE [dbo].[DetalleVenta] CHECK CONSTRAINT [FK_DetalleVenta_Promociones]
GO
ALTER TABLE [dbo].[DetalleVenta]  WITH CHECK ADD  CONSTRAINT [FK_DetalleVenta_Venta] FOREIGN KEY([IdVenta])
REFERENCES [dbo].[Venta] ([IdVenta])
GO
ALTER TABLE [dbo].[DetalleVenta] CHECK CONSTRAINT [FK_DetalleVenta_Venta]
GO
ALTER TABLE [dbo].[Ingrediente]  WITH NOCHECK ADD  CONSTRAINT [FK__Ingredien__sumin__208CD6FA] FOREIGN KEY([suministroId])
REFERENCES [dbo].[Suministro] ([id])
GO
ALTER TABLE [dbo].[Ingrediente] CHECK CONSTRAINT [FK__Ingredien__sumin__208CD6FA]
GO
ALTER TABLE [dbo].[Ingrediente]  WITH NOCHECK ADD  CONSTRAINT [FK_Ingrediente_Categorias] FOREIGN KEY([categoriaId])
REFERENCES [dbo].[Categorias] ([id])
GO
ALTER TABLE [dbo].[Ingrediente] CHECK CONSTRAINT [FK_Ingrediente_Categorias]
GO
ALTER TABLE [dbo].[Inventario]  WITH NOCHECK ADD  CONSTRAINT [FK_Inventario_Sucursal] FOREIGN KEY([sucursalId])
REFERENCES [dbo].[Sucursal] ([id])
GO
ALTER TABLE [dbo].[Inventario] CHECK CONSTRAINT [FK_Inventario_Sucursal]
GO
ALTER TABLE [dbo].[Inventario]  WITH NOCHECK ADD  CONSTRAINT [FK_Inventario_Suministro] FOREIGN KEY([suministroId])
REFERENCES [dbo].[Suministro] ([id])
GO
ALTER TABLE [dbo].[Inventario] CHECK CONSTRAINT [FK_Inventario_Suministro]
GO
ALTER TABLE [dbo].[Menu_Promociones]  WITH NOCHECK ADD  CONSTRAINT [FK_Menu_Promociones_Producto] FOREIGN KEY([productoId])
REFERENCES [dbo].[Producto] ([id])
GO
ALTER TABLE [dbo].[Menu_Promociones] CHECK CONSTRAINT [FK_Menu_Promociones_Producto]
GO
ALTER TABLE [dbo].[Menu_Promociones]  WITH NOCHECK ADD  CONSTRAINT [FK_Menu_Promociones_Promociones] FOREIGN KEY([promocionesId])
REFERENCES [dbo].[Promociones] ([id])
GO
ALTER TABLE [dbo].[Menu_Promociones] CHECK CONSTRAINT [FK_Menu_Promociones_Promociones]
GO
ALTER TABLE [dbo].[Mesa]  WITH NOCHECK ADD  CONSTRAINT [FK_Mesa_Sucursal] FOREIGN KEY([sucursalId])
REFERENCES [dbo].[Sucursal] ([id])
GO
ALTER TABLE [dbo].[Mesa] CHECK CONSTRAINT [FK_Mesa_Sucursal]
GO
ALTER TABLE [dbo].[Permisos]  WITH CHECK ADD  CONSTRAINT [FK__PERMISOS__IdRol__7849DB76] FOREIGN KEY([IdRol])
REFERENCES [dbo].[Roles] ([Id])
GO
ALTER TABLE [dbo].[Permisos] CHECK CONSTRAINT [FK__PERMISOS__IdRol__7849DB76]
GO
ALTER TABLE [dbo].[Permisos]  WITH CHECK ADD  CONSTRAINT [FK__PERMISOS__IdSubM__793DFFAF] FOREIGN KEY([IdSubMenu])
REFERENCES [dbo].[SubMenu] ([IdSubMenu])
GO
ALTER TABLE [dbo].[Permisos] CHECK CONSTRAINT [FK__PERMISOS__IdSubM__793DFFAF]
GO
ALTER TABLE [dbo].[RoleClaims]  WITH NOCHECK ADD  CONSTRAINT [FK_RoleClaims_Roles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[RoleClaims] CHECK CONSTRAINT [FK_RoleClaims_Roles_RoleId]
GO
ALTER TABLE [dbo].[SubMenu]  WITH CHECK ADD  CONSTRAINT [FK__SubMenu__IdMenu__73852659] FOREIGN KEY([IdMenu])
REFERENCES [dbo].[Menu] ([IdMenu])
GO
ALTER TABLE [dbo].[SubMenu] CHECK CONSTRAINT [FK__SubMenu__IdMenu__73852659]
GO
ALTER TABLE [dbo].[Union_Mesa]  WITH NOCHECK ADD  CONSTRAINT [FK_Union_Mesa_Mesa] FOREIGN KEY([mesaId])
REFERENCES [dbo].[Mesa] ([id])
GO
ALTER TABLE [dbo].[Union_Mesa] CHECK CONSTRAINT [FK_Union_Mesa_Mesa]
GO
ALTER TABLE [dbo].[UsuariosClaims]  WITH NOCHECK ADD  CONSTRAINT [FK_UsuariosClaims_Usuario_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Usuario] ([UsuarioId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsuariosClaims] CHECK CONSTRAINT [FK_UsuariosClaims_Usuario_UserId]
GO
ALTER TABLE [dbo].[UsuariosLogins]  WITH NOCHECK ADD  CONSTRAINT [FK_UsuariosLogins_Usuario_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Usuario] ([UsuarioId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsuariosLogins] CHECK CONSTRAINT [FK_UsuariosLogins_Usuario_UserId]
GO
ALTER TABLE [dbo].[UsuariosRoles]  WITH NOCHECK ADD  CONSTRAINT [FK_UsuariosRoles_Roles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsuariosRoles] CHECK CONSTRAINT [FK_UsuariosRoles_Roles_RoleId]
GO
ALTER TABLE [dbo].[UsuariosRoles]  WITH NOCHECK ADD  CONSTRAINT [FK_UsuariosRoles_Usuario_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Usuario] ([UsuarioId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsuariosRoles] CHECK CONSTRAINT [FK_UsuariosRoles_Usuario_UserId]
GO
ALTER TABLE [dbo].[UsuariosTokens]  WITH NOCHECK ADD  CONSTRAINT [FK_UsuariosTokens_Usuario_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Usuario] ([UsuarioId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsuariosTokens] CHECK CONSTRAINT [FK_UsuariosTokens_Usuario_UserId]
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Mesa] FOREIGN KEY([IdMesa])
REFERENCES [dbo].[Mesa] ([id])
GO
ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_Venta_Mesa]
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Sucursal] FOREIGN KEY([IdSucursal])
REFERENCES [dbo].[Sucursal] ([id])
GO
ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_Venta_Sucursal]
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Tipo_Consumo] FOREIGN KEY([IdTipoConsumo])
REFERENCES [dbo].[Tipo_Consumo] ([id])
GO
ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_Venta_Tipo_Consumo]
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Usuario] FOREIGN KEY([Usuario])
REFERENCES [dbo].[Usuario] ([UsuarioId])
GO
ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_Venta_Usuario]
GO
/****** Object:  StoredProcedure [dbo].[GetUser]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUser]
AS
BEGIN
    BEGIN TRY
       
        SELECT UserName
        FROM Usuario
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[RegistrarVenta]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--PROCEDIMIENTO PARA REGITRAR VENTA
CREATE procedure [dbo].[RegistrarVenta](
@Detalle xml,
@Resultado int output

)
as
begin

begin try

	BEGIN TRANSACTION
	--declare @mesa table (NombreMesa varchar(50),Capacidad varchar(50))
	declare @venta table (idmesa int,idsucursal int, usuario varchar(50),nombrecliente varchar(50),
						  cantidadproducto int,cantidadtotal int,
						  totalcosto decimal(18,2),importerecibido decimal(18,2),importecambio decimal(18,2),
						  Fecha datetime, TipoVenta int,descuento decimal(18,2), tipoPago varchar(50))

	declare @detalleventa table (IdVenta int,IdProducto int,Cantidad int,PrecioUnitario decimal(18,2),ImporteTotal decimal(18,2),
	 Fecha datetime, IdPromocion int, IdBebida int)


	insert into @venta(IdSucursal,IdMesa,Usuario,NombreCliente,CantidadProducto,CantidadTotal,TotalCosto,ImporteRecibido,ImporteCambio, Fecha, TipoVenta,descuento,tipoPago)
	select 
		 IdSucursal = Node.Data.value('(IdSucursal)[1]','varchar(100)'),
		 IdMesa = Node.Data.value('(IdMesa)[1]','varchar(100)'),
		 Usuario = Node.Data.value('(Usuario)[1]','varchar(100)'),
		 NombreCliente = Node.Data.value('(NombreCliente)[1]','varchar(100)'),
		 CantidadProducto = Node.Data.value('(CantidadProducto)[1]','varchar(50)'),
		 CantidadTotal = Node.Data.value('(CantidadTotal)[1]','varchar(50)'),
		 TotalCosto = Node.Data.value('(TotalCosto)[1]','decimal(18,2)'),
		 ImporteRecibido = Node.Data.value('(ImporteRecibido)[1]','decimal(18,2)'),
		 ImporteCambio = Node.Data.value('(ImporteCambio)[1]','decimal(18,2)'),
		 Fecha = Node.Data.value('(Fecha)[1]','datetime'),
		 TipoVenta = Node.Data.value('(TipoVenta)[1]','int'), 
		 Descuento = Node.Data.value('(Descuento)[1]','decimal(18,2)'),
		 TipoPago =  Node.Data.value('(TipoPago)[1]','varchar(50)')
		 FROM @Detalle.nodes('/DETALLE/VENTA') Node(Data)




		
		insert into @detalleventa(IdVenta,IdProducto,IdPromocion,Cantidad,PrecioUnitario,ImporteTotal, Fecha)
		 select 
		 IdVenta = Node.Data.value('(IdVenta)[1]','int'),
		 IdProducto = Node.Data.value('(IdProducto)[1]','int'),
		 IdPromocion = Node.Data.value('(IdPromocion)[1]','int'),
		 Cantidad = Node.Data.value('(Cantidad)[1]','int'),
		 PrecioUnitario = Node.Data.value('(PrecioUnidad)[1]','decimal(18,2)'),
		 ImporteTotal = Node.Data.value('(ImporteTotal)[1]','decimal(18,2)'),
		 Fecha = Node.Data.value('(Fecha)[1]','datetime')

		 FROM @Detalle.nodes('/DETALLE/DETALLE_VENTA/DATOS') Node(Data)
	--******************* AREA DE TRABAJO *************************
	declare @identity as table(ID int)

	insert into Venta(Codigo,ValorCodigo,IdMesa,IdSucursal,Usuario,NombreCliente,CantidadProducto,CantidadTotal,TotalCoste,ImporteRecibido,ImporteCambio, FechaRegistro,IdTipoConsumo,Estado,Descuento,TipoPago )
	output inserted.IdVenta into @identity
	select 
	RIGHT('000000' + convert(varchar(max),(select isnull(max(ValorCodigo),0) + 1 from Venta) ),6),
	(select isnull(max(ValorCodigo),0) + 1 from Venta),
	idmesa,idsucursal,usuario,nombrecliente,cantidadproducto,cantidadtotal,totalcosto,importerecibido,importecambio, Fecha, TipoVenta, 1,descuento,tipoPago
	from @venta

	
	update @detalleventa set idventa = (select ID from @identity)

	insert into DetalleVenta(IdVenta,IdProducto, IdPromocion,Cantidad,PrecioUnitario,ImporteTotal, FechRegistro, Estado)
	select idventa,idproducto, IdPromocion,cantidad,PrecioUnitario,importetotal, Fecha, 1 from @detalleventa
	

	

	 COMMIT
	 set @Resultado = (select ID from @identity)

 end try
 begin catch
	ROLLBACK
	set @Resultado = 0
 end catch
end
GO
/****** Object:  StoredProcedure [dbo].[SPBebida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPBebida]
@Inventario int
AS
BEGIN

	if(@Inventario=1)
	begin

    SELECT
        BEBIDA.id AS idBebida,
        BEBIDA.suministroId,
        BEBIDA.productoId,
        BEBIDA.categoriaId,
        SUMINISTRO.nombre AS nombreSuministro,
        SUMINISTRO.descripcion,
        SUMINISTRO.precioCompra,
		SUMINISTRO.FechaCaducidad,
		SUMINISTRO.estado as estadoSuministro,
        PRODUCTO.nombre AS nombreProducto,
        PRODUCTO.precio AS precioProducto,
		CATEGORIAS.nombre AS nombreCategoria,
		Inventario.cantidad as Stock
    FROM
        BEBIDA
    INNER JOIN SUMINISTRO ON BEBIDA.suministroId = SUMINISTRO.id
    INNER JOIN PRODUCTO ON BEBIDA.productoId = PRODUCTO.id
	inner Join Categorias on Bebida.categoriaId = Categorias.id
	INNER JOIN Inventario ON Inventario.suministroId = Suministro.id;

	end
	else
	begin
	SELECT
        BEBIDA.id AS idBebida,
        BEBIDA.suministroId,
        BEBIDA.productoId,
        BEBIDA.categoriaId,
        SUMINISTRO.nombre AS nombreSuministro,
        SUMINISTRO.descripcion,
        SUMINISTRO.precioCompra,
		SUMINISTRO.FechaCaducidad,
		SUMINISTRO.estado as estadoSuministro,
        PRODUCTO.nombre AS nombreProducto,
        PRODUCTO.precio AS precioProducto,
		CATEGORIAS.nombre AS nombreCategoria
		
    FROM
        BEBIDA
    INNER JOIN SUMINISTRO ON BEBIDA.suministroId = SUMINISTRO.id
    INNER JOIN PRODUCTO ON BEBIDA.productoId = PRODUCTO.id
	inner Join Categorias on Bebida.categoriaId = Categorias.id
	
	end
END


GO
/****** Object:  StoredProcedure [dbo].[SPCategoria]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SPCategoria] 
  
as  
begin  
select id, nombre, estado   
from Categorias  
end
GO
/****** Object:  StoredProcedure [dbo].[SPCierreIngredientes]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--PROCEDIMIENTO PARA Cierre Ingredientes
CREATE PROCEDURE [dbo].[SPCierreIngredientes]
(
    @Detalle xml,
    @Resultado int OUTPUT
)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Impresión para indicar que la transacción ha comenzado
        PRINT 'Iniciando transacción...';

        DECLARE @inventario TABLE (
            idInventario INT,
            nombre VARCHAR(80),
            cantidad DECIMAL(18,2),
            queda DECIMAL(18,2),
            uso DECIMAL(18,2),
            fechainicio DATE,
            fechacierre DATETIME
        );

		 DECLARE @fechaInicio DATE;

        INSERT INTO @inventario (idInventario, nombre, cantidad, queda, uso)
        SELECT 
            IdInventario = Node.Data.value('(tableData/ID)[1]','int'),
            Nombre =  Node.Data.value('(tableData/Nombre)[1]','varchar(80)'),
            Cantidad = Node.Data.value('(tableData/Stock)[1]','decimal(18,2)'),
            Queda = Node.Data.value('(tableData/Queda)[1]','decimal(18,2)'),
            Uso = Node.Data.value('(tableData/Uso)[1]','decimal(18,2)')

        FROM @Detalle.nodes('/data/row') Node(Data);

		

        -- Actualizar la tabla Inventario
      
        UPDATE Inventario
        SET cantidad = inv.queda
        FROM Inventario i
        JOIN @inventario inv ON i.suministroId = inv.idInventario
        WHERE i.suministroId = inv.idInventario;

	
       if(@@ROWCOUNT>0)
			print 'Se actualizo'
			

			-- Obtener la última fecha de cierre
DECLARE @ultimaFechaCierre DATETIME;
SELECT TOP 1 @ultimaFechaCierre = FechaCierre
FROM Venta
ORDER BY FechaCierre DESC;



SELECT TOP 1 @fechaInicio= FechaRegistro
FROM Venta
WHERE FechaCierre = @ultimaFechaCierre
ORDER BY FechaRegistro ASC;


SET @fechaInicio = @fechaInicio;



        INSERT INTO CierreIngrediente (IdInventario, CantidadUsada, FechaInicio, FechaCierre)
        SELECT idInventario, uso, @fechaInicio, @ultimaFechaCierre FROM @inventario;

		

		select ci.IdInventario, ci.CantidadUsada, ci.FechaInicio, ci.FechaCierre,s.nombre
		from CierreIngrediente ci inner join Inventario i on i.suministroId=ci.IdInventario
		inner join Suministro s on i.suministroId=s.id
		where  ci.FechaCierre = @ultimaFechaCierre

        COMMIT;
        SET @Resultado = 1;

    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[SPCierreIngredientesVerificar]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPCierreIngredientesVerificar]
(
    @Resultado int OUTPUT,
	@Cierre int,
	@FeCierre date
)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @fechaCierreVenta DATETIME;
        DECLARE @fecharegistroventa DATE;
        DECLARE @fechacierreingrediente DATETIME;
        DECLARE @fechainicioingre DATE;

        SELECT TOP 1 @fechaCierreVenta = FechaCierre
        FROM Venta
        ORDER BY FechaCierre DESC;

        SELECT TOP 1 @fecharegistroventa = FechaRegistro
        FROM Venta
        WHERE FechaCierre = @fechaCierreVenta
        ORDER BY FechaRegistro ASC;

        SELECT TOP 1 @fechacierreingrediente = FechaCierre
        FROM CierreIngrediente
        ORDER BY FechaCierre DESC;

        SELECT TOP 1 @fechainicioingre = FechaInicio
        FROM CierreIngrediente
        WHERE FechaCierre = @fechacierreingrediente
        ORDER BY FechaInicio ASC;

		 IF (@Cierre = 0)
    BEGIN

        IF @fechaCierreVenta = @fechacierreingrediente
        BEGIN
            SELECT ci.IdInventario, ci.CantidadUsada, ci.FechaInicio, ci.FechaCierre, s.nombre
            FROM CierreIngrediente ci
            INNER JOIN Inventario i ON i.suministroId = ci.IdInventario
            INNER JOIN Suministro s ON i.suministroId = s.id
            WHERE ci.FechaCierre = @fechacierreingrediente;
        END

		       
    END
    ELSE
    BEGIN

	declare @Fechacierre datetime
		select @Fechacierre=FechaCierre
		from Venta
		where   CONVERT(date, FechaRegistro) = @FeCierre

            SELECT ci.IdInventario, ci.CantidadUsada, ci.FechaInicio, ci.FechaCierre, s.nombre
            FROM CierreIngrediente ci
            INNER JOIN Inventario i ON i.suministroId = ci.IdInventario
            INNER JOIN Suministro s ON i.suministroId = s.id
            WHERE ci.FechaCierre = @Fechacierre;
    END

        COMMIT;
        SET @Resultado = 1;

    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;

    END CATCH;
END;

GO
/****** Object:  StoredProcedure [dbo].[SPCierreVenta]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPCierreVenta]
    @Resultado INT OUTPUT
AS
BEGIN
    BEGIN TRY
	 BEGIN TRANSACTION;
        DECLARE @UltimaFechaCierre DATETIME
        DECLARE @FechaCierreActual DATETIME
	   DECLARE @FechaCierre DATETIME

        -- Obtener FechaCierreActual
        SELECT @FechaCierreActual = GETDATE()
     PRINT 'Fecha de cierre actual: ' + CONVERT(VARCHAR, @FechaCierreActual)

        -- Obtener la última fecha de cierre de la tabla Venta
        SELECT @UltimaFechaCierre = MAX(FechaCierre)
        FROM Venta

		 PRINT 'Última fecha de cierre de ventas: ' + ISNULL(CONVERT(VARCHAR, @UltimaFechaCierre), 'No hay fecha de cierre previa')
        -- Si no hay fecha de cierre previa, establecerla como la fecha mínima en la base de datos
        IF @UltimaFechaCierre IS NULL
		begin
            SELECT @UltimaFechaCierre = MIN(FechaRegistro) FROM Venta
			PRINT 'Fecha de cierre previa no encontrada. Estableciendo la fecha mínima de registro como fecha de cierre previa: ' + CONVERT(VARCHAR, @UltimaFechaCierre)
		end
        -- Actualizar la fecha de cierre de las ventas en la tabla Venta
        UPDATE V
        SET V.FechaCierre = @FechaCierreActual
        FROM Venta V
        WHERE V.FechaCierre > @UltimaFechaCierre OR V.FechaCierre IS NULL



		-- Obtener la última fecha de cierre de la tabla Venta
       SELECT @FechaCierre = MAX(FechaCierre)
		FROM Venta;

		PRINT CONVERT(date, @FechaCierre);


        -- Obtener el resumen de productos vendidos en las ventas actualizadas
        SELECT 
            p.id AS Codigo,
            p.nombre AS Producto,
            SUM(dv.Cantidad) AS CantidadVendida,
            SUM(dv.ImporteTotal) AS Total 
        FROM 
            DetalleVenta dv
        INNER JOIN 
            Producto p ON dv.IdProducto = p.id
        INNER JOIN 
            Venta v ON v.IdVenta = dv.IdVenta
       WHERE 
	    v.FechaCierre = @FechaCierre
        GROUP BY 
            p.id,
            p.nombre;

        SET @Resultado = 1
		 COMMIT;
    END TRY
    BEGIN CATCH
        SET @Resultado = 0
        ROLLBACK
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SPComida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPComida]
AS
BEGIN
    SELECT
        Producto.id,
        PRODUCTO.nombre AS nombreProducto,
        PRODUCTO.precio AS precioProducto,
		PRODUCTO.estado AS estadoProducto,

		COMIDA.id AS idComida,
		COMIDA.productoId,
		COMIDA.descripcion AS descripcionComida
		
    FROM
       PRODUCTO INNER JOIN COMIDA 
	   ON PRODUCTO.id = COMIDA.productoId
END
GO
/****** Object:  StoredProcedure [dbo].[SPEliminarBebida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPEliminarBebida]
  
    @BebidaId INT,
    @Resultado BIT OUTPUT
AS
BEGIN
    SET @Resultado = 1;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar si la bebida existe en BEBIDA
        IF NOT EXISTS (SELECT 1 FROM BEBIDA WHERE id = @BebidaId)
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END

        -- Obtener el suministroId asociado a la bebida
        DECLARE @SuministroId INT;
        SELECT @SuministroId = suministroId FROM BEBIDA WHERE id = @BebidaId;

		
        -- Obtener el productoId asociado a la bebida
        DECLARE @ProductoId INT;
        SELECT @ProductoId = productoId FROM BEBIDA WHERE id = @BebidaId;

        -- Verificar si el suministro existe en SUMINISTRO
        IF NOT EXISTS (SELECT 1 FROM SUMINISTRO WHERE id = @SuministroId)
        BEGIN
			PRINT'No existe el Producto en Bebida'
            SET @Resultado = 0;
            RETURN;
        END

        -- Verificar si la bebida existe en PRODUCTO
        IF NOT EXISTS (SELECT 1 FROM PRODUCTO WHERE id = @ProductoId)
        BEGIN
			PRINT'No existe la bebida en Producto'
            SET @Resultado = 0;
            RETURN;
        END

        -- Eliminar de la tabla BEBIDA
        DELETE FROM BEBIDA WHERE id = @BebidaId;

		IF @@Rowcount  > 0
        PRINT 'Se elimino de la bebida ';

		--  si hay productos en la tabla Menu_Promociones
    IF EXISTS (SELECT 1 FROM Menu_Promociones WHERE productoId = @ProductoId)
    BEGIN
      
    DELETE FROM Menu_Promociones WHERE productoId = @ProductoId;
	IF @@Rowcount  > 0
        PRINT 'Se elimino producto de MenuPromociones ';
	END

	DELETE FROM Producto WHERE id = @ProductoId;
		IF @@Rowcount  > 0
        PRINT 'Se elimino de producto ';
   
    SET @SuministroId = (SELECT suministroId  FROM Bebida  where  productoId = @ProductoId)

        -- Eliminar de la tabla SUMINISTRO
        DELETE FROM SUMINISTRO WHERE id = @SuministroId;

		IF @@Rowcount  > 0
        PRINT 'Se elimino de suministro ';
   

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[SPEliminarCat]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SPEliminarCat](
@cod int,  
 @Resultado bit output  
)
AS  
BEGIN  
SET @Resultado = 1  
 SET NOCOUNT ON;  
  
    
 IF EXISTS (select id from Categorias where id=@cod)  
  
  delete from Categorias where id = @cod  
  
 ELSE  
  SET @Resultado = 0  
END  

GO
/****** Object:  StoredProcedure [dbo].[SPEliminarComida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPEliminarComida]
    -- Identificador de la bebida a eliminar
    @ComidaId INT,
    @Resultado BIT OUTPUT
AS
BEGIN
    SET @Resultado = 1;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar si la comida existe en COMIDA
        IF NOT EXISTS (SELECT 1 FROM COMIDA WHERE id = @ComidaId)
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END
        -- Obtener el productoId asociado a la COMIDA
        DECLARE @ProductoId INT;
        SELECT @ProductoId = productoId FROM COMIDA WHERE id = @ComidaId;

        -- Verificar si la comida existe en PRODUCTO
        IF NOT EXISTS (SELECT 1 FROM PRODUCTO WHERE id = @ProductoId)
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END

        -- Eliminar de la tabla COMIDA
        DELETE FROM COMIDA WHERE id = @ComidaId;

		--  si hay productos en la tabla Menu_Promociones
    IF EXISTS (SELECT 1 FROM Menu_Promociones WHERE productoId = @ProductoId)
    BEGIN
      
    DELETE FROM Menu_Promociones WHERE productoId = @ProductoId;
	IF @@Rowcount  > 0
        PRINT 'Se elimino producto de MenuPromociones ';
	END

        -- Eliminar de la tabla PRODUCTO
        DELETE FROM PRODUCTO WHERE id = @ProductoId;
        

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[SPEliminarIngrediente]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPEliminarIngrediente]
    -- Identificador del ingrediente a eliminar
    @IngredienteId INT,
    @Resultado BIT OUTPUT
AS
BEGIN
    SET @Resultado = 1;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar si el ingrediente existe en INGREDIENTE
        IF NOT EXISTS (SELECT 1 FROM INGREDIENTE WHERE id = @IngredienteId)
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END

        -- Obtener el suministroId asociado al ingrediente
        DECLARE @SuministroId INT;
        SELECT @SuministroId = suministroId FROM INGREDIENTE WHERE id = @IngredienteId;

        -- Verificar si el suministro existe en SUMINISTRO
        IF NOT EXISTS (SELECT 1 FROM SUMINISTRO WHERE id = @SuministroId)
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END

        -- Eliminar de la tabla INGREDIENTE
        DELETE FROM INGREDIENTE WHERE id = @IngredienteId;

        -- Eliminar de la tabla SUMINISTRO
        DELETE FROM SUMINISTRO WHERE id = @SuministroId;

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[SPEliminarMesa]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  proc [dbo].[SPEliminarMesa](
@cod int,  
 @Resultado bit output  
)
AS  
BEGIN  
SET @Resultado = 1  
 SET NOCOUNT ON;  
  
    
 IF EXISTS (select id from Mesa where id=@cod)  
  
  delete from Mesa where id = @cod  
  
 ELSE  
  SET @Resultado = 0  
END  
GO
/****** Object:  StoredProcedure [dbo].[SPEliminarPermiso]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SPEliminarPermiso](
    @IdRol nvarchar(MAX),
    @Resultado bit output
)
AS
BEGIN
    SET @Resultado = 1;

    BEGIN TRY
        BEGIN TRANSACTION; 

        Delete From Permisos 
		WHERE IdRol = @IdRol

        COMMIT; 
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[SPEliminarPromocion]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPEliminarPromocion]
    @IdPromcion INT,
    @Resultado INT OUTPUT
AS
BEGIN  
    SET @Resultado = 1  
    SET NOCOUNT ON;  
  
    IF EXISTS (SELECT id FROM Promociones WHERE id = @IdPromcion)  
    BEGIN
		DELETE FROM Menu_Promociones WHERE promocionesId = @IdPromcion;
        DELETE FROM Promociones WHERE id = @IdPromcion;
        
    END
    ELSE  
        SET @Resultado = 0  
END
GO
/****** Object:  StoredProcedure [dbo].[SPEliminarProveedor]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SPEliminarProveedor](
@cod int,  
 @Resultado bit output  
)
AS  
BEGIN  
SET @Resultado = 1  
 SET NOCOUNT ON;  
  
    
 IF EXISTS (select proveedorId from Proveedores where proveedorId=@cod)  
  
  delete from Proveedores where proveedorId = @cod  
  
 ELSE  
  SET @Resultado = 0  
END  
GO
/****** Object:  StoredProcedure [dbo].[SPIngrediente]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPIngrediente]
AS
BEGIN
    SELECT
		INGREDIENTE.id AS idIngrediente,
		INGREDIENTE.fechaVencimiento,
		INGREDIENTE.categoriaId,
		INGREDIENTE.suministroId,
        SUMINISTRO.nombre AS nombreSuministro,
        SUMINISTRO.descripcion,
        SUMINISTRO.precioCompra,
		SUMINISTRO.estado as estadoSuministro,
		CATEGORIAS.nombre AS nombreCategoria
    FROM
        INGREDIENTE
    INNER JOIN SUMINISTRO ON INGREDIENTE.suministroId = SUMINISTRO.id
	INNER JOIN CATEGORIAS on INGREDIENTE.categoriaId = Categorias.id;
END
GO
/****** Object:  StoredProcedure [dbo].[SPInventarioBebida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[SPInventarioBebida]
AS
BEGIN
    SELECT
		Suministro.id,
		Suministro.nombre AS nombreSuministro,
        Suministro.descripcion,
        SUMINISTRO.FechaCaducidad ,
        SUMINISTRO.precioCompra,
        SUMINISTRO.estado as estadoSuministro,
		
        Inventario.cantidad,

		Producto.precio AS precioProducto

    FROM
        Suministro
		INNER JOIN Inventario on Suministro.id = Inventario.suministroId
		inner join Bebida on Suministro.id = Bebida.suministroId
		INNER JOIN Producto ON Bebida.productoId = Producto.id
	
END

GO
/****** Object:  StoredProcedure [dbo].[SPInventarioIngredientes]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[SPInventarioIngredientes]
AS
BEGIN
    SELECT
		Suministro.id,
		Suministro.nombre AS nombreSuministro,
        Suministro.descripcion,
        SUMINISTRO.FechaCaducidad ,
        SUMINISTRO.precioCompra,
        SUMINISTRO.estado as estadoSuministro,
		
        Inventario.cantidad

		
    FROM
        Suministro
		INNER JOIN Inventario on Suministro.id = Inventario.suministroId
		inner join Ingrediente on Suministro.id = Ingrediente.suministroId
		
	
END
GO
/****** Object:  StoredProcedure [dbo].[SPMesa]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SPMesa]
  
as  
begin  
select id, nombre,capacidad, estado,sucursalId   
from Mesa 
end
GO
/****** Object:  StoredProcedure [dbo].[SPModificarBebida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPModificarBebida]
    -- Suministro
	@SuministroId INT,
    @NombreSuministro NVARCHAR(50),
    @DescripcionSuministro NVARCHAR(50),
    @EstadoSuministro BIT,
    -- Producto
    @NombreProducto NVARCHAR(50),
    -- Categorias
    @CategoriaId INT,
    -- Identificador de la bebida a modificar
    @BebidaId INT,
    -- Resultado de la operación
    @Resultado BIT OUTPUT
AS
BEGIN
   -- DECLARE @SuministroId INT;
    --DECLARE @ProductoId INT;

    -- Verificar si ya existe un SUMINISTRO con el mismo nombre
    IF EXISTS (SELECT 1 FROM SUMINISTRO WHERE nombre = @NombreSuministro AND id <> @SuministroId)
    BEGIN
	PRINT 'el nuevo nombre es igual aotro sumnistro en la tabla';
        SET @Resultado = 0;
		
        RETURN;
    END
	
    BEGIN TRY
        -- Actualizar SUMINISTRO
        UPDATE SUMINISTRO
        SET nombre = @NombreSuministro,
            descripcion = @DescripcionSuministro,
            estado = @EstadoSuministro
        WHERE id = (SELECT SUMINISTROID FROM BEBIDA WHERE id = @BebidaId);

        IF @@ROWCOUNT > 0
        BEGIN
            PRINT 'Actualizacion en la tabla SUMINISTRO completada exitosamente.';
        END
        ELSE
        BEGIN
            PRINT 'Error en la Actualizacion en la tabla SUMINISTRO.';
            SET @Resultado = 0;
            RETURN;
        END

        -- Actualizar PRODUCTO
        UPDATE PRODUCTO
        SET nombre = @NombreProducto
        WHERE id = (SELECT PRODUCTOID FROM BEBIDA WHERE id = @BebidaId);

        IF @@ROWCOUNT > 0
        BEGIN
            PRINT 'Actualizacion en la tabla PRODUCTO completada exitosamente.';
        END
        ELSE
        BEGIN
            PRINT 'Error en la Actualizacion en la tabla PRODUCTO.';
            SET @Resultado = 0;
            RETURN;
        END

        -- Actualizar BEBIDA
        UPDATE BEBIDA
        SET categoriaId = @CategoriaId
        WHERE id = @BebidaId;

        IF @@ROWCOUNT > 0
        BEGIN
            PRINT 'Actualizacion en la tabla BEBIDA completada exitosamente.';
        END
        ELSE
        BEGIN
            PRINT 'Error en la Actualizacion en la tabla BEBIDA.';
            SET @Resultado = 0;
            RETURN;
        END

        SET @Resultado = 1;
    END TRY
    BEGIN CATCH
        SET @Resultado = 0;
        ROLLBACK;
        RETURN;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[SPModificarCat]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SPModificarCat](  
@IdCategoria int,  
@NombreCat varchar(50),    
@Activo bit,  
@Resultado bit output  
)  
as  
begin  
 SET @Resultado = 1  
 IF NOT EXISTS (SELECT * FROM Categorias WHERE nombre =@NombreCat and id != @IdCategoria)  
    
  update Categorias set   
  nombre = @NombreCat,    
  estado = @Activo  
  where id = @IdCategoria  
  
 ELSE  
  SET @Resultado = 0  
  
end  
GO
/****** Object:  StoredProcedure [dbo].[SPModificarComida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPModificarComida]
   --Producto
    @ProductoId int,
    @NombreProducto NVARCHAR(50),
	@PrecioProducto DECIMAL(13,2),
    @EstadoProducto BIT,
--Comida
	@ComidaId INT,
    @DescripcionComida NVARCHAR(150),

    @Resultado BIT OUTPUT
AS
BEGIN
 

    -- Verificar si ya existe un PRODUCTO con el mismo nombre
     IF EXISTS (SELECT 1 FROM PRODUCTO WHERE nombre = @NombreProducto AND id != @ProductoId)
    BEGIN
        PRINT 'El nuevo nombre es igual a otro producto en la tabla';
        SET @Resultado = 0;
        RETURN;
    END


    BEGIN TRY
        -- Actualizar PRODUCTO
        UPDATE PRODUCTO
        SET nombre = @NombreProducto,
            precio = @PrecioProducto,
            estado = @EstadoProducto
        WHERE id = @ProductoId;

        
        -- Actualizar COMIDA
        UPDATE COMIDA
        SET descripcion = @DescripcionComida
        WHERE id = @ComidaId;

        SET @Resultado = 1;
    END TRY
    BEGIN CATCH
        SET @Resultado = 0;
        ROLLBACK;
        RETURN;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[SPModificarIngrediente]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPModificarIngrediente]
-- Ingrediente
    @IngredienteId INT,
	@CategoriaId INT,

-- Suministro
    @NombreSuministro NVARCHAR(50),
    @DescripcionSuministro NVARCHAR(50),
    @EstadoSuministro BIT,



    @Resultado BIT OUTPUT
AS
BEGIN
    SET @Resultado = 1;

    BEGIN TRY
        BEGIN TRANSACTION;
		-- Actualizar la tabla INGREDIENTE
		UPDATE INGREDIENTE
		SET categoriaId = @CategoriaId
		WHERE id = @IngredienteId;

        -- Actualizar la tabla SUMINISTRO
        UPDATE SUMINISTRO
        SET nombre = @NombreSuministro,
            descripcion = @DescripcionSuministro,
            estado = @EstadoSuministro
        FROM SUMINISTRO
        INNER JOIN INGREDIENTE ON SUMINISTRO.id = INGREDIENTE.suministroId
        WHERE INGREDIENTE.id = @IngredienteId;

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[SPModificarMesa]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SPModificarMesa](  
@IdMesa int,  

@Sucursal int,
@Capacidad int,
@Nombre varchar(50),    
@Resultado bit output,
@Estado bit  
)  
as  
begin  
 SET @Resultado = 1  
 IF NOT EXISTS (SELECT * FROM Mesa WHERE Nombre =@Nombre and id != @IdMesa)  
    
  update Mesa set   
  nombre = @Nombre,
  capacidad=@Capacidad,
  estado=@Estado,
  sucursalId=@Sucursal
   
  where id = @IdMesa  
  
 ELSE  
  SET @Resultado = 0  
  
end  
GO
/****** Object:  StoredProcedure [dbo].[SPModificarPermisos]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[SPModificarPermisos](
@Detalle xml,
@Resultado bit output
)
as
begin
begin try

	BEGIN TRANSACTION
	declare @permisos table(idpermisos int,activo bit)

	insert into @permisos(idpermisos,activo)
	select 
	idpermisos = Node.Data.value('(IdPermisos)[1]','int'),
	activo = Node.Data.value('(Activo)[1]','bit')
	FROM @Detalle.nodes('/DETALLE/PERMISO') Node(Data)

	select * from @permisos

	update p set p.Activo = pe.activo from PERMISOS p
	inner join @permisos pe on pe.idpermisos = p.IdPermisos

	COMMIT
	set @Resultado = 1

end try
begin catch
	ROLLBACK
	set @Resultado = 0
end catch
end
GO
/****** Object:  StoredProcedure [dbo].[SPModificarPromocion]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPModificarPromocion]
    @Detalle XML,
    @Resultado BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    SET @Resultado = 1;

    
    BEGIN TRY
     declare @promociones table(id int,nombre nvarchar(max),precio decimal(13,2), dias nvarchar(max),estado bit)
	 declare @menupromociones table(idproducto int,idpromocion int,cantidad decimal(13,2))

        
	 insert into @promociones(id,nombre,precio,dias,estado)
	 select 
	 Id = Node.Data.value('(Id)[1]','int'),
	 Nombre = Node.Data.value('(Nombre)[1]','nvarchar(max)'),
	 Precio = Node.Data.value('(Precio)[1]','decimal(13,2)'),
	 Dias = Node.Data.value('(Dias)[1]','nvarchar(max)'),
	 Estado = Node.Data.value('(Estado)[1]','bit')
	 FROM @Detalle.nodes('/DETALLE/PROMOCION') Node(Data)
		
		 IF @@ROWCOUNT > 0
        BEGIN
            PRINT 'se inserto';
        END
        ELSE
        BEGIN
            PRINT 'no se inserto';
            SET @Resultado = 0;
            RETURN;
        END

         insert into @menupromociones(idproducto,idpromocion,cantidad)
	 select 
	 IdProducto = Node.Data.value('(IdProducto)[1]','int'),
	 IdPromocion = Node.Data.value('(IdPromocion)[1]','int'),
	 Cantidad = Node.Data.value('(Cantidad)[1]','decimal(13,2)')
	 FROM @Detalle.nodes('/DETALLE/MENUPROMOCION/DETALLE') Node(Data)

	 IF @@ROWCOUNT > 0
        BEGIN
            PRINT 'se inserto';
        END
        ELSE
        BEGIN
            PRINT 'no se inserto';
            SET @Resultado = 0;
            RETURN;
        END

        -- Verificar si ya existe una PROMOCION con el mismo nombre
        IF EXISTS (SELECT 1 FROM PROMOCIONES WHERE nombre = (SELECT nombre FROM @promociones)AND id <> (SELECT id FROM @promociones))
        BEGIN
		PRINT 'EXITENOMBRE';
            SET @Resultado = 0;
            RETURN;
        END

        -- Modificar en la tabla PROMOCIONES
        UPDATE P
        SET
            P.nombre = PR.nombre,
            P.precio = PR.precio,
            P.dias = PR.dias,
            P.estado = PR.estado
        FROM PROMOCIONES P
        INNER JOIN @promociones PR ON P.id = PR.id;
	IF @@ROWCOUNT > 0
        BEGIN
            PRINT 'se actualizo';
        END
        ELSE
        BEGIN
            PRINT 'no se actualizo';
            SET @Resultado = 0;
            RETURN;
        END
      
	  IF EXISTS ( SELECT promocionesId FROM Menu_Promociones WHERE promocionesId =  (select id from @promociones))
	  BEGIN
        -- Modificar en la tabla MENUPROMOCION
        DELETE FROM MENU_PROMOCIONES WHERE promocionesId =  (select id from @promociones); 
		IF @@ROWCOUNT > 0
        BEGIN
            PRINT 'se elimino';
        END
        ELSE
        BEGIN
            PRINT 'no se elimino';
            SET @Resultado = 0;
            RETURN;
        END
	END
		

        INSERT INTO MENU_PROMOCIONES (productoId, promocionesId, cantidad)
        SELECT idproducto, idpromocion, cantidad FROM @menupromociones;
		IF @@ROWCOUNT > 0
        BEGIN
            PRINT 'se inserto';
        END
        ELSE
        BEGIN
            PRINT 'no se inserto';
            SET @Resultado = 0;
            RETURN;
        END
        -- Confirmar la transacción si todo ha sido exitoso
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
		print 'ocurrio algo';
        SET @Resultado = 0;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[SPModificarProveedor]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SPModificarProveedor](  
@IdProveedor int,  
@Nombre varchar(255),   
@Direccion varchar(255),
@Telefono varchar(15),
@Estado bit,  
@Resultado bit output  
)  
as  
begin  
 SET @Resultado = 1  
 IF NOT EXISTS (SELECT * FROM Proveedores WHERE Nombre =@Nombre and proveedorId != @IdProveedor)  
    
  update Proveedores set   
  Nombre = @Nombre,
  Direccion = @Direccion,
  Telefono = @Telefono,
  estado = @Estado  
  where proveedorId = @IdProveedor 
  
 ELSE  
  SET @Resultado = 0  
  
end  
GO
/****** Object:  StoredProcedure [dbo].[SPModificarSucursal]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPModificarSucursal]
(
    
    @Id int,
    @Nombre varchar(50),
    @Direccion nvarchar(50),
    @Municipio nvarchar(50),
    @Departamento nvarchar(50),
    @Telefono varchar(20),
   
    @Resultado bit output
)
AS
BEGIN
    SET @Resultado = 1;

    IF NOT EXISTS (SELECT * FROM Sucursal WHERE nombreEmpresa = @Nombre AND Id != @Id)
    BEGIN
        UPDATE Sucursal SET
            nombreEmpresa = @Nombre,
            direccion = @Direccion,
            municipio = @Municipio,
            departamento = @Departamento,
            numTelefono = @Telefono
           
        WHERE id = @Id;
    END
    ELSE
    BEGIN
        SET @Resultado = 0;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[SPModificarTConsumo]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[SPModificarTConsumo]
(
    
    @Id int,
    @Estado bit,
    @Resultado bit output
)
AS
BEGIN
    SET @Resultado = 1;

   
        UPDATE Tipo_Consumo SET
            estado = @Estado
            where id=@Id
           
END;
GO
/****** Object:  StoredProcedure [dbo].[SPObtenerDetalleCompra]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SPObtenerDetalleCompra](
@IdCompra int
)
as
begin


select  RIGHT('000000' + convert(varchar(max),c.IdCompra),6)[Codigo],
CONVERT(char(10),c.FechaRegistro,103)[FechaCompra],
CONVERT(decimal(10,2), c.TotalCosto)[TotalCosto],

(select p.proveedorId,p.nombre from Proveedores P
 where p.proveedorId = c.IdProveedor
FOR XML PATH (''),TYPE) AS 'DETALLE_PROVEEDOR',

(select T.id, T.nombreEmpresa, T.direccion from Sucursal T
 where T.id = c.IdSucursal
FOR XML PATH (''),TYPE) AS 'DETALLE_TIENDA',

(select convert(int, dc.Cantidad)[Cantidad],concat(s.nombre,' - ',s.descripcion)[NombreProducto],
CONVERT(decimal(10,2),s.precioCompra)PrecioUnitarioCompra,
CONVERT(decimal(10,2),c.TotalCosto)[TotalCosto] 
from DetalleCompra dc
inner join Suministro s on s.id = dc.SuministroId
where dc.IdCompra = c.IdCompra
FOR XML PATH ('PRODUCTO'),TYPE) AS 'DETALLE_PRODUCTO'

from COMPRA c
where c.IdCompra =@IdCompra
FOR XML PATH(''), ROOT('DETALLE_COMPRA') 
end

GO
/****** Object:  StoredProcedure [dbo].[SPObtenerDetalleUsuario]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPObtenerDetalleUsuario]
(
    @IdUsuario uniqueidentifier
)
AS
begin

 select 
	UsuarioId,Nombre,Apellido,
	(select id,nombreEmpresa from Sucursal t
			FOR XML PATH (''),TYPE) AS 'DetalleTienda'
							,
								(select * from Roles r
									where r.Id = (select RoleId from UsuariosRoles ur where ur.UserId=@IdUsuario)
										FOR XML PATH (''),TYPE) AS 'DetalleRol'
											,
												(select t.NombreMenu,t.Icono,
																	(select sm.Nombre[NombreSubMenu],sm.Controlador,sm.Vista,p.Activo
																									from PERMISOS p
																									inner join Roles r on r.Id = p.IdRol
																									inner join UsuariosRoles ur on ur.RoleId = r.Id
																									inner join SUBMENU sm on sm.IdSubMenu = p.IdSubMenu
																									inner join MENU m on m.IdMenu = sm.IdMenu
																									inner join USUARIO u on u.UsuarioId = ur.UserId and u.UsuarioId = up.UsuarioId
																									where sm.IdMenu = t.IdMenu
																									FOR XML PATH ('SubMenu'),TYPE) AS 'DetalleSubMenu' 

														from (
															select distinct m.Nombre[NombreMenu],m.IdMenu,m.Icono
																from PERMISOS p
																		inner join Roles r on r.Id = p.IdRol
																									inner join UsuariosRoles ur on ur.RoleId = r.Id
																									inner join SUBMENU sm on sm.IdSubMenu = p.IdSubMenu
																									inner join MENU m on m.IdMenu = sm.IdMenu
																									inner join USUARIO u on u.UsuarioId = ur.UserId and u.UsuarioId = up.UsuarioId
																		where p.Activo = 1) t
																		FOR XML PATH ('Menu'),TYPE) AS 'DetalleMenu'  
	from USUARIO up
	where UP.UsuarioId = @IdUsuario
	FOR XML PATH(''), ROOT('Usuario')  

end
GO
/****** Object:  StoredProcedure [dbo].[SPObtenerDetalleVenta]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SPObtenerDetalleVenta](
@IdVenta int
)
as
begin


select V.Codigo,v.NombreCliente,v.TipoPago,v.Descuento,
		CONVERT(decimal(10,2), V.TotalCoste)[TotalCosto],
		CONVERT(decimal(10,2),V.ImporteRecibido)[ImporteRecibido],
		CONVERT(decimal(10,2), V.ImporteCambio)[ImporteCambio],
		convert(char(10),v.fechaRegistro,103)[FechaRegistro],
						(
							select u.Nombre,u.Apellido from USUARIO U
							where U.UsuarioId = v.Usuario
							FOR XML PATH (''),TYPE) AS 'DETALLE_USUARIO',

									(
									select T.numTelefono, T.nombreEmpresa, T.Direccion from Sucursal T
									where T.id = V.IdSucursal
									FOR XML PATH (''),TYPE) AS 'DETALLE_TIENDA',
									(
										select dvs.Cantidad[CantPromocion], pr.nombre,
										CONVERT(decimal(10,2),dvs.PrecioUnitario)[PrecioUnidadPromo],
										CONVERT(decimal(10,2),dvs.ImporteTotal)[ImporteTotalPromo] 
										from DetalleVenta dvs 
										inner join Promociones pr on dvs.IdPromocion=pr.id
										where dvs.IdVenta = v.IdVenta
										FOR XML PATH ('PROMOCION'),TYPE) AS 'DETALLE_PROMOCION',
										(
													select dv.Cantidad,p.Nombre[NombreProducto],
													CONVERT(decimal(10,2),dv.PrecioUnitario)[PrecioUnidad],
													CONVERT(decimal(10,2),dv.ImporteTotal)[ImporteTotal] 
													from DetalleVenta dv
													inner join PRODUCTO p on p.id = dv.IdProducto
												
													where dv.IdVenta = v.IdVenta
													FOR XML PATH ('PRODUCTO'),TYPE
													) AS 'DETALLE_PRODUCTO'

											from VENTA v
											where v.IdVenta = @IdVenta
											FOR XML PATH(''), ROOT('DETALLE_VENTA') 

	end

GO
/****** Object:  StoredProcedure [dbo].[SPObtenerListaCompra]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SPObtenerListaCompra](
@FechaInicio date,
@FechaFin date,
@IdProveedor int = 0 ,
@IdTienda int = 0
)
as
begin
SET DATEFORMAT dmy;
select c.IdCompra,RIGHT('000000' + convert(varchar(max),c.IdCompra),6)[NumeroCompra], p.nombre,t.nombreEmpresa,
convert(char(10),c.FechaRegistro,103)[FechaCompra],c.TotalCosto from COMPRA c
inner join Proveedores p on p.proveedorId = c.IdProveedor
inner join Sucursal t on t.id = c.IdSucursal
where 
CONVERT(date,c.FechaRegistro) between @FechaInicio and @FechaFin and
p.proveedorId = iif(@IdProveedor = 0,p.proveedorId,@IdProveedor) and
t.id =iif(@IdTienda = 0,t.id,@IdTienda) 

end


GO
/****** Object:  StoredProcedure [dbo].[SPObtenerListaVenta]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPObtenerListaVenta]
    @Codigo VARCHAR(50) = '',
    @FechaInicio DATE,
    @FechaFin DATE,
    @Nombre VARCHAR(100) = ''
AS
BEGIN
    SET DATEFORMAT dmy;

    SELECT v.IdVenta, v.Codigo, v.FechaRegistro, v.NombreCliente, v.TotalCoste, v.Descuento, v.TipoPago
    FROM VENTA v
    WHERE
        CONVERT(INT, v.Codigo) = CASE WHEN @Codigo = '' THEN CONVERT(INT, v.Codigo) ELSE CONVERT(INT, @Codigo) END AND
        CONVERT(DATE, v.FechaRegistro) BETWEEN @FechaInicio AND @FechaFin AND
        v.NombreCliente LIKE '%' + @Nombre + '%';
END
GO
/****** Object:  StoredProcedure [dbo].[SPObtenerPermisos]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SPObtenerPermisos](
@IdRol nvarchar(Max))
as
begin
select p.IdPermisos,m.Nombre[Menu],sm.Nombre[SubMenu],p.Activo from 
PERMISOS p
inner join SUBMENU sm on sm.IdSubMenu = p.IdSubMenu
inner join MENU m on m.IdMenu = sm.IdMenu
where p.IdRol = @IdRol
end
GO
/****** Object:  StoredProcedure [dbo].[SPPromocion]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPPromocion]
AS
BEGIN
    SELECT 
        Promociones.id as IdPromocion, 
        Promociones.nombre as NombrePromocion, 
        Promociones.dias as DiasPromocion, 
        Promociones.precio as PrecioPromocion,
		Promociones.estado as Estado
		
    FROM 
        Promociones 
END
GO
/****** Object:  StoredProcedure [dbo].[SPPromocionProductos]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPPromocionProductos]
@PromocionId INT
AS 
BEGIN  

    SELECT 
        Pro.id as idPromocion,
        Pro.nombre as Promocion,
        Pro.precio as Preciopromocion,
        Pro.estado as estadoPromocion,
        Pro.dias as Dias,
        Mp.promocionesId as IdPromocion,
        Mp.productoId as IDProducto,
        Mp.cantidad as CantidadProducto,
        p.nombre as Producto
       
    FROM 
        Menu_Promociones as Mp 
        INNER JOIN Producto as P ON P.id = Mp.productoId
        INNER JOIN Promociones as Pro ON Pro.id = Mp.promocionesId
    WHERE 
        Mp.promocionesId = @PromocionId;

		

END

GO
/****** Object:  StoredProcedure [dbo].[SPProveedor]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SPProveedor] 
  
as  
begin  
select proveedorId, Nombre, Direccion, Telefono, estado   
from Proveedores  
end
GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarBebida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPRegistrarBebida]
--Suministro
    @NombreSuministro NVARCHAR(50),
    @DescripcionSuministro NVARCHAR(50),
    @EstadoSuministro BIT,
--Producto
    @NombreProducto NVARCHAR(50),
    @EstadoProducto BIT,
--Categorias
    @CategoriaId INT,
   
    @Resultado BIT OUTPUT
AS
BEGIN
    SET @Resultado = 1;

    DECLARE @SuministroId INT;
    DECLARE @ProductoId INT;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar si ya existe un SUMINISTRO con el mismo nombre
        IF EXISTS (SELECT 1 FROM SUMINISTRO WHERE nombre = @NombreSuministro)
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END

		 --  -- Verificar si ya existe un PRODUCTO con el mismo nombre
			--IF EXISTS (SELECT 1 FROM PRODUCTO WHERE nombre = @NombreSuministro)
			--	BEGIN
			--	SET @Resultado = 0;

			--	RETURN;
			--END

        -- Insertar en la tabla SUMINISTRO
        INSERT INTO SUMINISTRO (nombre, descripcion, estado)
        VALUES (@NombreSuministro, @DescripcionSuministro, @EstadoSuministro);

        -- Obtener el ID del nuevo SUMINISTRO
        SET @SuministroId = SCOPE_IDENTITY();

        -- Insertar en la tabla PRODUCTO
        INSERT INTO PRODUCTO (nombre, estado)
        VALUES (@NombreProducto, @EstadoProducto);

        -- Obtener el ID del nuevo PRODUCTO
        SET @ProductoId = SCOPE_IDENTITY();

        -- Insertar en la tabla BEBIDA
        INSERT INTO BEBIDA (suministroId, productoId, categoriaId)
        VALUES (@SuministroId, @ProductoId, @CategoriaId);

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH
END;

GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarCat]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SPRegistrarCat](    
@Nombre varchar(50),    
@Resultado bit output,
@Activo_ bit
)  
as    
begin    
 SET @Resultado = 1    
 IF NOT EXISTS (SELECT * FROM Categorias WHERE nombre = @Nombre)    
    
  insert into Categorias(nombre,estado) values (    
  @Nombre, @Activo_    
  )    
 ELSE    
  SET @Resultado = 0    
     
end 
GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarComida]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPRegistrarComida]
--Producto
    @NombreProducto NVARCHAR(50),
	@PrecioProducto DECIMAL(13,2),
    @EstadoProducto BIT,
--Comida
    @DescripcionComida NVARCHAR(150),
   
    @Resultado BIT OUTPUT
AS
BEGIN
    SET @Resultado = 1;

    DECLARE @ProductoId INT;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar si ya existe un PRODUCTO con el mismo nombre
        IF EXISTS (SELECT 1 FROM PRODUCTO WHERE nombre = @NombreProducto)
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END

        -- Insertar en la tabla PRODUCTO
        INSERT INTO PRODUCTO (nombre, precio, estado)
        VALUES (@NombreProducto, @PrecioProducto, @EstadoProducto);

        -- Obtener el ID del nuevo PRODUCTO
        SET @ProductoId = SCOPE_IDENTITY();

        -- Insertar en la tabla COMIDA
        INSERT INTO COMIDA (productoId,descripcion)
        VALUES (@ProductoId,@DescripcionComida);

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH
END;

GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarCompra]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPRegistrarCompra]
    @Detalle XML,
    @Resultado BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    SET @Resultado = 1;

    BEGIN TRY
     declare @compra table(idsucursal int,idproveedor int,totalcosto decimal(18,2),estado bit)
	declare @detallecompra table(idsucursal int,idsuministro int,idcompra int,cantidad decimal(13,2),preciounidadcompra decimal(18,2),preciounidadventa decimal(18,2),estado bit)

	 insert into @compra(idsucursal,idproveedor,totalcosto)
	 select 
	 IdSucursal = Node.Data.value('(IdSucursal)[1]','int'),
	 IdProveedor = Node.Data.value('(IdProveedor)[1]','int'),
	 TotalCosto = Node.Data.value('(TotalCosto)[1]','decimal(18,2)')
	 
	 FROM @Detalle.nodes('/DETALLE/COMPRA') Node(Data)
 
	 insert into @detallecompra(idsucursal,idsuministro,idcompra,cantidad,precioUnidadCompra,precioUnidadVenta)
	 select 
	 IdSucursal = Node.Data.value('(IdSucursal)[1]','int'),
	 IdSuministro = Node.Data.value('(IdSuministro)[1]','int'),
	 IdCompra = Node.Data.value('(IdCompra)[1]','int'),
	 Cantidad = Node.Data.value('(Cantidad)[1]','int'),
	 PrecioUnidadCompra = Node.Data.value('(PrecioUnidadCompra)[1]','decimal(18,2)'),
	 PrecioUnidadVenta = Node.Data.value('(PrecioUnidadVenta)[1]','decimal(18,2)')
	
	 FROM @Detalle.nodes('/DETALLE/DETALLE_COMPRA/DETALLE') Node(Data)

	
	 declare @IdCompra int = 0
	
	 --Insertar en Tabla Compra
	 insert into Compra(IdSucursal,IdProveedor,TotalCosto,Estado)
	 select idsucursal,idproveedor,totalcosto,1 from @compra
	 

	 set @IdCompra = Scope_identity()
	 update @detallecompra set idcompra = @IdCompra

	 --Insertar en tabla DetalleCompra
	 insert into DetalleCompra(SuministroId,IdCompra,Cantidad,Estado)
	 select idsuministro,idcompra,cantidad,1 from @detallecompra

	DECLARE @idsuministro INT
	DECLARE @idsuministrosTemp TABLE (idsuministro INT)


	INSERT INTO @idsuministrosTemp (idsuministro)
	SELECT idsuministro FROM @detallecompra

	-- Insertar en Inventario
	IF NOT EXISTS (SELECT suministroId FROM Inventario WHERE suministroId IN (SELECT idsuministro FROM @idsuministrosTemp))
	BEGIN
    
	 INSERT INTO Inventario (sucursalId, suministroId, cantidad)
		SELECT idsucursal, idsuministro, cantidad FROM @detallecompra
	END
	ELSE
	BEGIN
    -- actualizamos la cantidad sumándola a la existente
		UPDATE I
		SET I.cantidad = I.cantidad + D.cantidad
		FROM Inventario I
		INNER JOIN @detallecompra D ON I.suministroId = D.idsuministro
	END

	-- Actualizar PrecioCompra de Suministro
	UPDATE Suministro
	SET precioCompra = dc.preciounidadcompra
	FROM Suministro
	JOIN @detallecompra dc ON Suministro.id = dc.idsuministro;
	
	
	--Actualizar PrecioVenta de la tabla Producto 
	UPDATE Producto
	SET precio = dc.preciounidadventa
	FROM Producto
	JOIN Bebida b ON Producto.id = b.productoId
	JOIN @detallecompra dc ON b.suministroId = dc.idsuministro
	WHERE dc.preciounidadventa IS NOT NULL
    AND dc.preciounidadventa <> 0;
	
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SET @Resultado = 0;
		PRINT'REVERTIDO'
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarIngrediente]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPRegistrarIngrediente]
--Suministro
    @NombreSuministro NVARCHAR(50),
    @DescripcionSuministro NVARCHAR(50),
    @EstadoSuministro BIT,
--Ingrediente
	--@FechaVencimiento DATETIME,
--Categorias
    @CategoriaId INT,
   
    @Resultado BIT OUTPUT
AS
BEGIN
    SET @Resultado = 1;

    DECLARE @SuministroId INT;
   
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar si ya existe un SUMINISTRO con el mismo nombre
        IF EXISTS (SELECT 1 FROM SUMINISTRO WHERE nombre = @NombreSuministro)
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END

		 --  -- Verificar si ya existe un PRODUCTO con el mismo nombre
			--IF EXISTS (SELECT 1 FROM PRODUCTO WHERE nombre = @NombreSuministro)
			--	BEGIN
			--	SET @Resultado = 0;

			--	RETURN;
			--END

        -- Insertar en la tabla SUMINISTRO
        INSERT INTO SUMINISTRO (nombre, descripcion, estado)
        VALUES (@NombreSuministro, @DescripcionSuministro, @EstadoSuministro);

        -- Obtener el ID del nuevo SUMINISTRO
        SET @SuministroId = SCOPE_IDENTITY();


        -- Insertar en la tabla INGREDIENTE
        INSERT INTO INGREDIENTE (suministroId, categoriaId)
        VALUES (@SuministroId, @CategoriaId);

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarMesa]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SPRegistrarMesa](  

@Sucursal int,
@Capacidad int,
@Nombre varchar(50),    
@Resultado bit output,
@Estado bit
)  
as    
begin    
 SET @Resultado = 1    
 IF NOT EXISTS (SELECT * FROM Mesa WHERE Nombre = @Nombre)    
    
  insert into Mesa(Nombre,capacidad,estado,sucursalId) 
  values (    
  @Nombre,@Capacidad, @Estado,@Sucursal
  )    
 ELSE    
  SET @Resultado = 0    
end 
GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarPermiso]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SPRegistrarPermiso](
    @IdRol nvarchar(MAX),
    @Resultado bit output
)
AS
BEGIN
    SET @Resultado = 1;

    BEGIN TRY
        BEGIN TRANSACTION; 

       IF NOT EXISTS (SELECT IdRol FROM Permisos WHERE IdRol=@IdRol)
	   BEGIN
        INSERT INTO PERMISOS (IdRol, IdSubMenu, Activo)
        SELECT @IdRol, IdSubMenu, 1 FROM SUBMENU;
	END
        COMMIT; 
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarPermisoRol]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROC [dbo].[SPRegistrarPermisoRol](
    @IdRol nvarchar(MAX),
    @Resultado bit output
)
AS
BEGIN
    SET @Resultado = 1;

    BEGIN TRY
        BEGIN TRANSACTION; 

       
        INSERT INTO PERMISOS (IdRol, IdSubMenu, Activo)
        SELECT @IdRol, IdSubMenu, 0 FROM SUBMENU;

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK; 
        SET @Resultado = 0;
        RETURN;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarPromocion]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPRegistrarPromocion]
	@Detalle XML,
    @Resultado BIT OUTPUT   
AS
BEGIN
 SET NOCOUNT ON;
    BEGIN TRANSACTION;
    SET @Resultado = 1;

	DECLARE @PromocionId INT

    BEGIN TRY
       
     declare @promociones table(nombre nvarchar(60),precio decimal(13,2), dias nvarchar(50),estado bit)
	 declare @menupromociones table(idproducto int,idpromocion int,cantidad decimal(13,2))

	 insert into @promociones(nombre,precio,dias,estado)
	 select 
	 Nombre = Node.Data.value('(Nombre)[1]','nvarchar(60)'),
	 Precio = Node.Data.value('(Precio)[1]','decimal(13,2)'),
	 Dias = Node.Data.value('(Dias)[1]','nvarchar(90)'),
	 Estado = Node.Data.value('(Estado)[1]','bit')
	 FROM @Detalle.nodes('/DETALLE/PROMOCION') Node(Data)
 
	 insert into @menupromociones(idproducto,idpromocion,cantidad)
	 select 
	 IdProducto = Node.Data.value('(IdProducto)[1]','int'),
	 IdPromocion = Node.Data.value('(IdPromocion)[1]','int'),
	 Cantidad = Node.Data.value('(Cantidad)[1]','decimal(13,2)')
	 FROM @Detalle.nodes('/DETALLE/MENUPROMOCION/DETALLE') Node(Data)


        -- Verificar si ya existe una PROMOCION con el mismo nombre
        IF EXISTS (SELECT 1 FROM PROMOCIONES WHERE nombre = (SELECT nombre FROM @promociones))
        BEGIN
            SET @Resultado = 0;
            RETURN;
        END


        -- Insertar en la tabla PROMOCIONES
        INSERT INTO PROMOCIONES(nombre, precio, estado,dias)
        SELECT  nombre, precio, estado,dias FROM @promociones



        -- Obtener el ID del la nueva PROMOCION
        SET @PromocionId = SCOPE_IDENTITY();
		update @menupromociones set idpromocion = @PromocionId

        -- Insertar en la tabla MENUPROMOCION
        INSERT INTO MENU_PROMOCIONES (productoId, promocionesId,cantidad)
        SELECT idproducto, idpromocion,cantidad FROM @menupromociones

        -- Confirmar la transacción si todo ha sido exitoso
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SET @Resultado = 0;
    END CATCH;
END;

GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarProveedor]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SPRegistrarProveedor](    
@Nombre varchar(255), 
@Direccion varchar(255),
@Telefono varchar(15),
@Resultado bit output,
@Estado_ bit
)  
as    
begin    
 SET @Resultado = 1    
 IF NOT EXISTS (SELECT * FROM Proveedores WHERE Nombre = @Nombre)    
    
  insert into Proveedores(Nombre,Direccion,Telefono,estado) values (    
  @Nombre,@Direccion, @Telefono, @Estado_   
  )    
 ELSE    
  SET @Resultado = 0    
     
end 
GO
/****** Object:  StoredProcedure [dbo].[SPRegistrarSucursal]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPRegistrarSucursal]
(
    @Nombre varchar(50),
    @Direccion nvarchar(50),
    @Municipio nvarchar(50),
    @Departamento nvarchar(50),
    @Telefono varchar(20),
   
    @Resultado bit output
)
AS
BEGIN
    SET @Resultado = 1;
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT * FROM Sucursal WHERE nombreEmpresa = @Nombre)
        BEGIN
            INSERT INTO SUCURSAL(nombreEmpresa, direccion, municipio, departamento, numTelefono)
            VALUES (@Nombre, @Direccion, @Municipio, @Departamento, @Telefono);
        END

        COMMIT; 
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SET @Resultado = 0;
        RETURN;
    END CATCH
END;



GO
/****** Object:  StoredProcedure [dbo].[SPRol]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPRol]
AS
BEGIN
    SELECT
        Id,Name,Estado
    FROM
	Roles
        
END
GO
/****** Object:  StoredProcedure [dbo].[SPrptCompra]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPrptCompra]
    @FechaInicio DATE,
    @FechaFin DATE
AS
BEGIN
    SELECT 
        c.IdCompra[Numero Documento],
        CONVERT(char(10), c.FechaRegistro, 103)[Fecha Venta],
        p.nombre[Proveedor],
        c.TotalCosto[Total Compra] 
    FROM 
        Compra c
    INNER JOIN 
        Sucursal t ON t.id = c.IdSucursal
    INNER JOIN 
        Proveedores p ON p.proveedorId = c.IdProveedor
    WHERE 
        CONVERT(date, c.FechaRegistro) BETWEEN @FechaInicio AND @FechaFin;
END;
GO
/****** Object:  StoredProcedure [dbo].[SPrptVenta]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SPrptVenta] (
@FechaInicio date,
@FechaFin date,
@IdTienda int = 0,
@Cierre int
)
as
begin
DECLARE @Fechacierre datetime

select @Fechacierre = FechaCierre
from Venta
where   CONVERT(date, FechaRegistro) = @FechaInicio



  IF (@Cierre = 0)
    BEGIN

 select convert(char(10), v.FechaRegistro ,103)[Fecha Venta],v.Codigo[Numero Documento],
 concat(u.Nombre,' ', u.Apellido)[Nombre Empleado],
 v.CantidadTotal[Cantidad Unidades Vendidas],v.CantidadProducto[Cantidad Productos],v.TotalCoste[Total Venta] 
 from VENTA v
 inner join Sucursal t on t.id = v.IdSucursal
 inner join USUARIO u on u.UsuarioId = v.Usuario
 where 
 CONVERT(date,v.FechaRegistro) between @FechaInicio and @FechaFin 
 and v.IdSucursal = iif(@IdTienda =0 ,v.IdSucursal,@IdTienda)

  END
    ELSE
    BEGIN

	
 select convert(char(10), v.FechaRegistro ,103)[Fecha Venta],v.Codigo[Numero Documento],
 concat(u.Nombre,' ', u.Apellido)[Nombre Empleado],
 v.CantidadTotal[Cantidad Unidades Vendidas],v.CantidadProducto[Cantidad Productos],v.TotalCoste[Total Venta] 
 from VENTA v
 inner join Sucursal t on t.id = v.IdSucursal
 inner join USUARIO u on u.UsuarioId = v.Usuario
 where 
v.FechaCierre = @Fechacierre

	 END

end


GO
/****** Object:  StoredProcedure [dbo].[SPrptVentaProducto]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPrptVentaProducto]
    @FechaInicio DATE,
    @FechaFin DATE,
    @Cierre INT
AS
BEGIN
DECLARE @Fechacierre datetime

select @Fechacierre=FechaCierre
from Venta
where   CONVERT(date, FechaRegistro) = @FechaInicio

    IF (@Cierre = 0)
    BEGIN
        SELECT 
            p.id AS Codigo,
            p.nombre AS Producto,
            SUM(dv.Cantidad) AS CantidadVendida,
            SUM(dv.ImporteTotal) AS Total 
        FROM 
            DetalleVenta dv
        INNER JOIN 
            Producto p ON dv.IdProducto = p.id
        WHERE 
            CONVERT(date, dv.FechRegistro) BETWEEN @FechaInicio AND @FechaFin
        GROUP BY 
            p.id,
            p.nombre;
    END
    ELSE
    BEGIN

       SELECT 
            p.id AS Codigo,
            p.nombre AS Producto,
            SUM(dv.Cantidad) AS CantidadVendida,
            SUM(dv.ImporteTotal) AS Total 
        FROM 
            DetalleVenta dv
        INNER JOIN 
            Producto p ON dv.IdProducto = p.id
        INNER JOIN 
            Venta v ON v.IdVenta = dv.IdVenta
       WHERE 
	    v.FechaCierre = @FechaCierre
        GROUP BY 
            p.id,
            p.nombre;

    END
END;
GO
/****** Object:  StoredProcedure [dbo].[SPSucursal]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SPSucursal] 
as  
begin  
select id,nombreEmpresa,direccion,municipio,departamento,numTelefono
from Sucursal 
end
GO
/****** Object:  StoredProcedure [dbo].[SPTConsumo]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[SPTConsumo] 
as  
begin  
select id, tipo,estado
from Tipo_Consumo 
end
GO
/****** Object:  StoredProcedure [dbo].[StockControlar]    Script Date: 14/02/2024 14:34:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--PROCEDIMIENTO PARA STOCK PRODUCTO_TIENDA

CREATE PROCEDURE [dbo].[StockControlar](
    @IdProducto_ int,
    @Cantidad_ int,
    @Restar_ bit,
    @Resultado bit output)
AS
BEGIN
    SET @Resultado = 0  -- Establecer predeterminadamente en 0

    BEGIN TRY
        IF(@Restar_ = 1)
            UPDATE Inventario 
            SET cantidad = cantidad - @Cantidad_ 
            WHERE suministroId =@IdProducto_
        ELSE
            UPDATE Inventario 
            SET cantidad = cantidad + @Cantidad_ 
            WHERE suministroId = @IdProducto_
        
		
			

        -- Verificar si hubo cambios (filas afectadas)
        IF @@ROWCOUNT > 0
            SET @Resultado = 1  -- Actualización exitosa
    END TRY
    BEGIN CATCH
        -- Dejar @Resultado en 0 si ocurre un error
        SET @Resultado = 0
    END CATCH
END



GO
USE [master]
GO
ALTER DATABASE [EPA] SET  READ_WRITE 
GO
