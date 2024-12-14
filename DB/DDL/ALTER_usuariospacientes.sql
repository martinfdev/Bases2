ALTER TABLE Usuario
ALTER COLUMN direccion NVARCHAR(MAX);

ALTER TABLE Paciente
ALTER COLUMN direccion NVARCHAR(MAX);

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