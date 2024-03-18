-- Script de inserción para la tabla Sucursal
Use EPA
GO
INSERT INTO Sucursal (id,nombreEmpresa, direccion, municipio, departamento, numTelefono)
VALUES (1,'Bar y Restaurante Epa', 'Alcaldía Municipal 50 mtrs este', 'La Paz', 'Carazo', '5818156891');
GO


--Insertar Mesas
INSERT INTO Mesa (nombre, capacidad, estado, sucursalId)
VALUES
('Mesa 1', 4, 1, 1),
('Mesa 2', 4, 1, 1),
('Mesa 3', 4, 1, 1),
('Mesa 4', 4, 1, 1),
('Mesa 5', 4, 1, 1),
('Mesa 6', 4, 1, 1),
('Mesa 7', 4, 1, 1),
('Mesa 8', 4, 1, 1),
('Mesa 9', 4, 1, 1),
('Mesa 10', 4, 1, 1),
('Rancho 1', 6, 1, 1),
('Rancho 2', 6, 1, 1),
('Rancho 3', 6, 1, 1),
('Rancho 4', 6, 1, 1),
('Rancho 5', 3, 1, 1);
GO

-- Insertar Tipos de consumo
INSERT INTO Tipo_Consumo(tipo, estado)
VALUES 
('Comer Aqui',1),
('Llevar',1),
('Domicilio',1);
GO

-- Script de inserción para la tabla Menu
INSERT INTO Menu ( Nombre, Icono, Activo, FechaRegistro)
VALUES
( 'Usuarios', 'bx bx-user-circle', 1, '2024-09-01 13:20:12.480'),
( 'Catálogos', 'bx bx-cog', 1, '2024-09-01 13:20:41.323'),
( 'Inventário', 'bx bx-list-plus', 1, '2024-09-01 13:21:15.513'),
( 'Compras', 'bx bx-cart-alt', 1, '2024-09-01 13:21:43.053'),
('Ventas', 'bx bx-purchase-tag-alt', 1, '2024-09-01 13:22:07.987'),
('Reportes', 'bx bx-bar-chart-alt', 1, '2024-09-01 13:22:32.140');
GO

-- Script de inserción para la tabla SubMenu
INSERT INTO SubMenu (IdMenu, Nombre, Controlador, Vista, Activo, FechaRegistro)
VALUES
(1, 'Usuarios', 'Usuario', 'ViewUsuarios', 1, '2024-01-09 13:31:18.390'),
(2, 'Categorías', 'Categoria', 'ViewCategorias', 1, '2024-01-09 13:32:04.863'),
(2, 'Productos', 'Comida', 'ViewComidas', 1, '2024-01-09 13:32:35.670'),
(2, 'Promociones', 'Promocion', 'ViewPromociones', 1, '2024-01-09 13:32:58.703'),
(2, 'Mesas', 'Mesa', 'ViewMesas', 1, '2024-01-09 13:33:29.860'),
(3, 'Inventário', 'InventarioBebida', 'ViewInventarioBebidas', 1, '2024-01-09 13:34:00.733'),
(4, 'Registrar', 'Compra', 'ViewCompraCrear', 1, '2024-01-09 13:34:38.690'),
(4, 'Consultar compra', 'Compra', 'Consultar', 1, '2024-01-09 13:35:12.830'),
(4, 'Proveedores', 'Proveedor', 'ViewProveedores', 1, '2024-01-09 13:35:36.060'),
(5, 'Registrar', 'Venta', 'ViewVentasCrear', 1, '2024-01-09 13:36:20.040'),
(5, 'Detalles', 'Venta', 'ConsultarVenta', 1, '2024-01-09 13:37:41.463'),
(6, 'Reporte Ventas', 'Reporte', 'ViewReporteVenta', 1, '2024-01-09 13:38:16.227'),
(6, 'Reporte Compras', 'Reporte', 'ViewReporteCompra', 1, '2024-01-09 13:39:16.907');
GO

--Insertar en tabla Roles
INSERT INTO Roles (Id,Name,NormalizedName,ConcurrencyStamp,Discriminator,Estado)
VALUES
('05b80b15-e08a-4e8c-977a-f6c81dd4078c','Empleado','EMPLEADO','a57e0b0f-71a1-441d-b0cf-2cc760fa802b','UserRole',1),
('fbac2194-8a63-4480-8d01-f6b851d5e5f5','SuperAdmin','SUPERADMIN','23cc099b-5fdb-4ca5-9200-12224dc5cdfa','UserRole',1);
GO


--Insertar en Tabla Permisos
INSERT INTO Permisos (IdRol, IdSubMenu, Activo)
VALUES
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 1, 0),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 2, 0),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 3, 0),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 4, 0),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 5, 0),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 6, 1),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 7, 1),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 8, 1),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 9, 0),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 10, 1),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 11, 1),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 12, 0),
    ('05b80b15-e08a-4e8c-977a-f6c81dd4078c', 13, 0),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 1, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 2, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 3, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 4, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 5, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 6, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 7, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 8, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 9, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 10, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 11, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 12, 1),
    ('fbac2194-8a63-4480-8d01-f6b851d5e5f5', 13, 1);
GO



--Insertar en Usuario
INSERT INTO Usuario (UsuarioId,Salario, EstadoContrato, UserName, NormalizedUserName, Email, NormalizedEmail, EmailConfirmed, PasswordHash, SecurityStamp, ConcurrencyStamp, PhoneNumber, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnd, LockoutEnabled, AccessFailedCount, Apellido, Nombre, Genero, Nacimiento, Direccion)
VALUES
    ('22238c17-764c-45ea-8bff-e2843201520c',0.00, 1, 'laraaldo33@gmail.com', 'LARAALDO33@GMAIL.COM', 'laraaldo33@gmail.com', 'LARAALDO33@GMAIL.COM', 0, 'AQAAAAEAACcQAAAAEJTqXamyyUQhzQaW92RjfDcmuI0Zz/0WhlR1oUvq2YCaijM8W79X9Iw0RmQLeRGyfQ==', 'SVS5K27XE57QZ6NZEZ24NQNZM5TQYTBG', '8e1e10a5-9ec2-4295-add2-60afede46b99', NULL, 0, 0, NULL, 1, 0, 'Vanegas', 'Aldo', NULL, NULL, NULL)  
	GO


	--Insertar en UsuarioRoles
	INSERT INTO UsuariosRoles(UserId, RoleId)
VALUES
    ('22238c17-764c-45ea-8bff-e2843201520c', 'fbac2194-8a63-4480-8d01-f6b851d5e5f5')
    GO


--Insertar en Categorias
INSERT INTO Categorias (nombre, estado) 
VALUES 
('Cervezas', 1),
('Gaseosas', 1),
('Agua', 1),
('Carnes', 1),
('Lacteos', 1),
('Vegetales', 1);
GO


-- Insertar en tabla Producto
INSERT INTO Producto (nombre, precio, estado) 
VALUES 
('Chilaquiles de Pollo', 180.00, 1),
('Cuilaquiles Mixtos', 200.00, 1),
('Nachos', 220.00, 1),
('Alitas Empanizadas', 180.00, 1),
('Alitas Empanizadas 2LB', 280.00, 1),
('Alitas Barbacoa', 190.00, 1),
('Alias Barbacoa 2LB', 290.00, 1),
('Alitas Búfalo', 190.00, 1),
('Alitas Búfalo2LB', 290.00, 1),
('Tostones con Queso', 120.00, 1),
('Tostones Mixtos', 160.00, 1),
('Dedos de Pollo', 180.00, 1),
('Filete de Pollo', 200.00, 1),
('Fajitas de Pollo', 180.00, 1),
('Filete de Cerdo', 200.00, 1),
('Costillas de Cerdo Barbacoa', 200.00, 1),
('Costillas de Cerdo Búfalo', 200.00, 1),
('Filete de Res', 240.00, 1),
('Churrasco', 270.00, 1),
('Surtido EPA', 900.00, 1),
('Toña', NULL, 1),
('Clasica', NULL, 1),
('Frost', NULL, 1),
('Bamboo', NULL, 1),
('Smirnoff', NULL, 1),
('Toña lata', NULL, 1),
('Gaseosa', NULL, 1),
('Agua', NULL, 1);
GO


-- Insertar en tabla Comida
INSERT INTO Comida (descripcion, productoId)
VALUES
('tortillas,carne de pollo, mozarela', 1),
('tortillas, carne cerdo y pollo, mozarela', 2),
('tortillas, chédar, mozarela, carne cerdo y pollo', 3),
('papas, 4 a 5 alitas, ranch', 4),
('papas, 9 a 10 alitas, ranch', 5),
('papas, barbacoa, 4 a 5 alitas', 6),
('papas, barbacoa, 9 a 10 alitas', 7),
('papas, búfalo, 4 a 5 alitas, vegetales', 8),
('papas, búfalo, 9 a 10 alitas, vegetales', 9),
('tostones, queso , ensalada', 10),
('tostones, carne cerdo, ensalada, queso', 11),
('papas, arroz, salsa tomate', 12),
('arroz, ensalada, tostones', 13),
('papas, arroz, ensalada', 14),
('arroz, tostones, ensalada', 15),
('tostones,barbacoa, arroz, ensalada', 16),
('tostones, búfalo, arroz, ensalada', 17),
('tostones, arroz, ensalada', 18),
('tostones, arroz, ensalada', 19),
('bandeja completa de cerdo, pollo, res, maduros, tortillas papas', 20);
GO


-- Insertar en Tabla Suministro
INSERT INTO Suministro (nombre, descripcion, estado, precioCompra)
VALUES
('Toña', 'Unidad 12 onz', 1, NULL),
('Clasica', 'Unidad 12 onz', 1, NULL),
('Frost', 'Unidad 12 onz', 1, NULL),
('Bamboo', 'Unidad 350ml', 1, NULL),
('Smirnoff', 'Unidad 12 onz', 1, NULL),
('Toña lata', 'Unidad 350ml', 1, NULL),
('Gaseosa', 'Unidad 12 onz', 1, NULL),
('Agua', 'Unidad 12 onz', 1, NULL),
('Carne de Res', '1 libra', 1, 98.00),
('Carne de Pollo', '1 libra', 1, 52.00),
('Carne de Cerdo', '1 libra', 1, 80.00),
('Tomate', 'Unidad', 1, NULL),
('Jalapeño', 'Tarro', 1, NULL),
('Salsa Tomate', 'Bote 250 ml', 1, NULL);
GO


-- Insertar en Tabla Bebidas
INSERT INTO Bebida (suministroId, productoId, categoriaId)
VALUES
(1, 21, 1),
(2, 22, 1),
(3, 23, 1),
(4, 24, 1),
(5, 25, 1),
(6, 26, 1),
(7, 27, 2),
(8, 28, 3);
GO


-- Insertar en tabla Ingredientes
INSERT INTO Ingrediente (fechaVencimiento, categoriaId, suministroId)
VALUES
(NULL, 4, 9),
(NULL, 4, 10),
(NULL, 4, 11),
(NULL, 6, 12),
(NULL, 6, 13),
(NULL, 6, 14);
GO


-- Insertar en Tabla Promocion 
INSERT INTO Promociones(nombre, precio, estado, dias)
VALUES
('Cubetazo Toña', 230.00, 1, 'Sabado, Domingo'),
('Alitas', 400.00, 1, 'Jueves, Viernes'),
('Boquitas', 300.00, 1, 'Sabado');
GO


-- Insertar en tabla Menu_Promociones
INSERT INTO Menu_Promociones (productoId, promocionesId, cantidad)
VALUES
(3, 3, 1.00),
(4, 2, 1.00),
(7, 2, 1.00),
(10, 3, 1.00),
(21, 1, 6.00);
GO

-- Insertar en Tabla Proveedores
INSERT INTO Proveedores (nombre, direccion, telefono, estado)
VALUES
('Carnicería San Martin', 'Jinotepe', '86582536', 1),
('Cervecería Toña', 'Managua', '58486923', 1),
('Mercado', 'Jinotepe', '5418181981', 1);
GO