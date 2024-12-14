CREATE TABLE PacienteHistorico(
    id_historico INT PRIMARY KEY IDENTITY(1,1),
	tipo_modificacion VARCHAR(25) NOT NULL,
	fecha_insercion DATETIME NOT NULL,
	id_paciente INT ,
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	dpi VARCHAR(13)  NOT NULL,
	genero VARCHAR(10) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	telefono VARCHAR(15) NULL,
	direccion NVARCHAR(MAX) NULL,
	id_area INT NOT NULL,
	estado VARCHAR(50) NOT NULL,
	FOREIGN KEY (id_area) REFERENCES Area(id_area)
);