CREATE DATABASE BD2_ProyectoG2;
USE BD2_ProyectoG2;

CREATE TABLE Especialidad (
    id_especialidad INT PRIMARY KEY IDENTITY(1,1),
    especialidad VARCHAR(100) NOT NULL
);

CREATE TABLE rol(
	id_rol INT PRIMARY KEY IDENTITY (1,1),
	nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Usuario (
	id_usuario INT PRIMARY KEY IDENTITY(1,1),
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
	FOREIGN KEY (id_especialidad) REFERENCES Especialidad(id_especialidad),
	FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);


INSERT INTO Usuario (nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, estado )VALUES
("Eduardo Alexander", "Reyes Gonzalez", "eduardoalex2000@hotmail.com", 4,"35958027","3013805890101","Masculino","2024/12/13",1)



CREATE TABLE ContactoEmergencia (
    id_contacto INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL FOREIGN KEY REFERENCES Usuario(id_usuario),
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL
);


CREATE TABLE Area(
	id_area INT PRIMARY KEY IDENTITY(1,1),
	nombre_area VARCHAR(150) UNIQUE NOT NULL,
	capacidad INT NOT NULL
);

CREATE TABLE Paciente(
	id_paciente INT PRIMARY KEY IDENTITY(1,1),
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	dpi VARCHAR(13) UNIQUE NOT NULL,
	genero VARCHAR(10) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	telefono VARCHAR(15) NULL,
	direccion TEXT NULL,
	id_area INT NOT NULL,
	estado VARCHAR(50) NOT NULL,
	FOREIGN KEY (id_area) REFERENCES Area(id_area)
);

CREATE TABLE AreaUsuario(
	id_area INT,
	id_usuario INT,
	FOREIGN KEY (id_area) REFERENCES Area(id_area),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);


CREATE TABLE PacienteEnfermera(
	id_paciente INT,
	id_usuario INT,
	FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);