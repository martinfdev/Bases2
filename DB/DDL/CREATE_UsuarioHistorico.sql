CREATE TABLE UsuarioHistorico (
	id_historico INT PRIMARY KEY IDENTITY(1,1),
	tipo_modificacion VARCHAR(25) NOT NULL,
	fecha_insercion DATETIME NOT NULL,
	id_usuario INT,
	nombres VARCHAR(100) NOT NULL,
	apellidos VARCHAR(100) NOT NULL,
	correo VARCHAR(150) NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
	id_rol INT NOT NULL,
	telefono VARCHAR(15) NULL,
	dpi VARCHAR(13) NOT NULL,
	genero VARCHAR(10) NOT NULL,
	direccion VARCHAR(MAX) NULL,
	fecha_ingreso DATE NOT NULL,
	id_especialidad INT NULL,
	fecha_vencimiento_colegiado DATE NULL,
	estado INT NOT NULL
);

CREATE TRIGGER trg_usuario_cambios
on Usuario
AFTER INSERT, UPDATE, DELETE
AS BEGIN
	SET NOCOUNT ON;
	--INSERT
	IF EXISTS (SELECT * FROM inserted) AND NOT EXISTS (SELECT * FROM deleted)
	BEGIN 
		INSERT INTO UsuarioHistorico (tipo_modificacion, fecha_insercion,id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
		SELECT
		'INSERT' AS tipo_modificacion,
        GETDATE() AS fecha_insercion,
		id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado
		FROM inserted;
	END
	-- UPDATE
    IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO UsuarioHistorico (tipo_modificacion, fecha_insercion,id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
        SELECT 
            'UPDATE' AS tipo_modificacion, -- Indica el tipo de operación
            GETDATE() AS fecha_insercion,
            id_usuario,nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado
        FROM inserted;
    END

    -- DELETE
    IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        INSERT INTO UsuarioHistorico (tipo_modificacion, fecha_insercion,id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
        SELECT 
            'DELETE' AS tipo_modificacion, -- Indica el tipo de operación
            GETDATE() AS fecha_insercion,
            id_usuario,nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado
        FROM deleted;
    END
END