CREATE TABLE UsuarioHistorico (
	id_usuario INT PRIMARY KEY IDENTITY(1,1),
	tipo_modificacion VARCHAR(25) NOT NULL,
	nombres VARCHAR(100) NOT NULL,
	apellidos VARCHAR(100) NOT NULL,
	correo VARCHAR(150) UNIQUE NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
	id_rol INT NOT NULL,
	telefono VARCHAR(15) NULL,
	dpi VARCHAR(13) UNIQUE NOT NULL,
	genero VARCHAR(10) NOT NULL,
	direccion TEXT NULL,
	fecha_ingreso DATE NOT NULL,
	id_especialidad INT NULL,
	fecha_vencimiento_colegiado DATE NULL,
	estado INT NOT NULL,
	fecha_insercion DATE NOT NULL
);