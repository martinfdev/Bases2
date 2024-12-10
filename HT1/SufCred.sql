USE BD2;
GO

-- Definir variables
DECLARE @IdEstudiante INT = 1; -- Estudiante Juan Pérez con 30 créditos
DECLARE @IdCurso INT = 1;      -- Curso "Base de Datos II" con mínimo 20 créditos
DECLARE @CreditosEstudiante INT;
DECLARE @CreditosMinimos INT;

BEGIN TRAN -- Inicia la transacción

-- Obtener los créditos del estudiante
SELECT @CreditosEstudiante = Creditos FROM Estudiante WHERE IdEstudiante = @IdEstudiante;

-- Obtener los créditos mínimos del curso
SELECT @CreditosMinimos = CreditosMinimos FROM Curso WHERE IdCurso = @IdCurso;

PRINT 'Verificando créditos...';
PRINT 'Créditos del Estudiante: ' + CAST(@CreditosEstudiante AS VARCHAR(10));
PRINT 'Créditos mínimos del Curso: ' + CAST(@CreditosMinimos AS VARCHAR(10));

IF @CreditosEstudiante >= @CreditosMinimos
BEGIN
    -- Insertar la asignación
    INSERT INTO Asignacion (IdEstudiante, IdCurso) VALUES (@IdEstudiante, @IdCurso);

    PRINT 'El estudiante cumple con los créditos requeridos. Realizando COMMIT...';
    COMMIT TRAN;
END
ELSE
BEGIN
    PRINT 'El estudiante NO cumple con los créditos requeridos. Haciendo ROLLBACK...';
    ROLLBACK TRAN;
END

-- Verificar resultados
SELECT * FROM Asignacion;
