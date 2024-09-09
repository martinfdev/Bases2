namespace AppPdfRep.Helpers
{
    public static class ExceptionHelper
    {
        public static void LogException(Exception ex)
        {
            string logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs", "exceptions.txt");
            Directory.CreateDirectory(Path.GetDirectoryName(logFilePath));

            // Detalles de la excepción
            string logMessage = $@"
            [{DateTime.Now}] 
            Tipo de Excepción: {ex.GetType().Name}
            Mensaje: {ex.Message}
            Inner Exception: {ex.InnerException?.Message}
            StackTrace: {ex.StackTrace}
            ------------------------------------------------";

            // Escribir en archivo de log
            File.AppendAllText(logFilePath, logMessage);
        }
    }
}
