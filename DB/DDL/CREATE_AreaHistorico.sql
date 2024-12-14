CREATE TABLE AreaHistorico(
	id_historico INT PRIMARY KEY IDENTITY(1,1),
	tipo_modificacion VARCHAR(25) NOT NULL,
	fecha_insercion DATETIME NOT NULL,
	id_area INT ,
	nombre_area VARCHAR(150) NOT NULL,
	capacidad INT NOT NULL
);

CREATE TRIGGER trg_area_cambios
ON Area
AFTER INSERT, UPDATE, DELETE
AS BEGIN
    SET NOCOUNT ON;
    
    -- INSERT
    IF EXISTS (SELECT * FROM inserted) AND NOT EXISTS (SELECT * FROM deleted)
    BEGIN 
        INSERT INTO AreaHistorico (tipo_modificacion, fecha_insercion, id_area, nombre_area, capacidad)
        SELECT
            'INSERT' AS tipo_modificacion,
            GETDATE() AS fecha_insercion,
            id_area, nombre_area, capacidad
        FROM inserted;
    END
    
    -- UPDATE
    IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO AreaHistorico (tipo_modificacion, fecha_insercion, id_area, nombre_area, capacidad)
        SELECT
            'UPDATE' AS tipo_modificacion, 
            GETDATE() AS fecha_insercion,
            id_area, nombre_area, capacidad
        FROM inserted;
    END

    -- DELETE
    IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO AreaHistorico (tipo_modificacion, fecha_insercion, id_area, nombre_area, capacidad)
        SELECT
            'DELETE' AS tipo_modificacion, 
            GETDATE() AS fecha_insercion,
            id_area, nombre_area, capacidad
        FROM deleted;
    END
END;