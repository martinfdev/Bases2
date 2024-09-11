namespace AppPdfRep.Helpers
{
    public static class BrowserOperations
    {

        public static void OpenBrowser(string url)
        {
            try
            {
                System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo { 
                    FileName = url,
                    UseShellExecute = true

                });
            }
            catch (Exception ex)
            {
                ExceptionHelper.LogException(new Exception("Error al abrir el navegador: ", ex));

            }
        }


    }
}
