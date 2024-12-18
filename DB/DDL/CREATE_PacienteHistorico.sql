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

CREATE TRIGGER trg_paciente_cambios
ON Paciente
AFTER INSERT, UPDATE, DELETE
AS BEGIN
    SET NOCOUNT ON;
    
    -- INSERT
    IF EXISTS (SELECT * FROM inserted) AND NOT EXISTS (SELECT * FROM deleted)
    BEGIN 
        INSERT INTO PacienteHistorico (tipo_modificacion, fecha_insercion, id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado)
        SELECT
            'INSERT' AS tipo_modificacion,
            GETDATE() AS fecha_insercion,
            id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado
        FROM inserted;
    END
    
    -- UPDATE
    IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO PacienteHistorico (tipo_modificacion, fecha_insercion, id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado)
        SELECT
            'UPDATE' AS tipo_modificacion, 
            GETDATE() AS fecha_insercion,
            id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado
        FROM inserted;
    END

    -- DELETE
    IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO PacienteHistorico (tipo_modificacion, fecha_insercion, id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado)
        SELECT
            'DELETE' AS tipo_modificacion, 
            GETDATE() AS fecha_insercion,
            id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado
        FROM deleted;
    END
END;