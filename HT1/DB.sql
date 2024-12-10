-- Crear la base de datos 
IF DB_ID('BD2') IS NULL
    CREATE DATABASE BD2;
GO

USE BD2;
GO

-- Eliminación de tablas previas 
IF OBJECT_ID('dbo.Asignacion', 'U') IS NOT NULL
    DROP TABLE dbo.Asignacion;
IF OBJECT_ID('dbo.Curso', 'U') IS NOT NULL
    DROP TABLE dbo.Curso;
IF OBJECT_ID('dbo.Estudiante', 'U') IS NOT NULL
    DROP TABLE dbo.Estudiante;

-- Creación de la tabla Estudiante
CREATE TABLE Estudiante (
    IdEstudiante INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Carnet VARCHAR(50) NOT NULL,
    Creditos INT NOT NULL
);

-- Creación de la tabla Curso
CREATE TABLE Curso (
    IdCurso INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    CreditosMinimos INT NOT NULL
);

-- Creación de la tabla Asignacion
CREATE TABLE Asignacion (
    IdAsignacion INT IDENTITY(1,1) PRIMARY KEY,
    IdEstudiante INT NOT NULL,
    IdCurso INT NOT NULL,
    FOREIGN KEY (IdEstudiante) REFERENCES Estudiante(IdEstudiante),
    FOREIGN KEY (IdCurso) REFERENCES Curso(IdCurso)
);

-- Insertar datos de prueba en Estudiante
INSERT INTO Estudiante (Nombre, Carnet, Creditos) VALUES
('Juan Pérez', 'C001', 30),
('María López', 'C002', 15),
('Carlos Ruiz', 'C003', 10);

-- Insertar datos de prueba en Curso
-- Supongamos que el curso requiere al menos 20 créditos para poder inscribirse
INSERT INTO Curso (Nombre, CreditosMinimos) VALUES
('Base de Datos II', 20),
('Programación Avanzada', 25),
('Redes', 15);

SELECT * FROM Estudiante;
SELECT * FROM Curso;
