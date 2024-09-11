using AppPdfGenAccountStatus.Helpers;
using AppPdfGenAccountStatus.Models;
using AppPdfRep.Helpers;
using SoapVstec;

namespace AppPdfGenAccountStatus.Services
{
    public class PdfGenerationService
    {
        private readonly IWebHostEnvironment _env;

        private readonly TarjetaService _tarjetaService;

        private readonly ISoapService _soapService;

        public PdfGenerationService(IWebHostEnvironment env, ISoapService soapService, TarjetaService tarjetaService)
        {
            _env = env;
            _soapService = soapService;
            _tarjetaService = tarjetaService;
        }

        private static string GeneratePdfDirectory()
        {
            string path = Path.Combine(Directory.GetCurrentDirectory());
            string year = DateTime.Now.ToString("yyyy");
            string timeStamp = DateTime.Now.ToString("MMddHHmmss");
            string directoryPath = Path.Combine(path, year, timeStamp);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            return directoryPath;
        }

        private static string GetPathforPDf(string codeClient, string directoryPath)
        {
            return Path.Combine(directoryPath, codeClient + ".pdf");
        }

        public async Task GenerateStatusAccMonth(int year, int month, int day = 0)
        {
            string directoryPath = GeneratePdfDirectory();
            try
            {
                List<Tarjeta> listCardAccounts = new List<Tarjeta>
            {
                new Tarjeta
                {
                    NumTarjeta = "4078563000003711",
                },
                new Tarjeta
                {
                    NumTarjeta = "4078560600012035",
                },
                new Tarjeta
                {
                    NumTarjeta = "4078563000006631",
                },
            };
                await RequestToVstforAccountAsync(listCardAccounts, directoryPath, year, month, day);
            }
            catch (Exception ex2)
            {
                Exception ex = ex2;
                throw new Exception("Error", ex);
            }
        }

        private static string GetFourLastumberCard(string numCard)
        {
            return numCard.Substring(numCard.Length - 4);
        }

        private async Task RequestToVstforAccountAsync(List<Tarjeta> listAccountsCard, string directoryPath, int year, int month, int day = 0)
        {
            DataInputModel dataInput = new DataInputModel
            {
                Year = year,
                Month = month,
                Day = day
            };
            foreach (Tarjeta card in listAccountsCard)
            {
                dataInput.codeClient = GetFourLastumberCard(card.NumTarjeta);
                Console.WriteLine(dataInput.codeClient);
                string pathPdf = GetPathforPDf(dataInput.codeClient, directoryPath);
                Console.WriteLine(pathPdf);
                try
                {
                    string numCardEncripted = EncryptDecrypt_AES.EncryptStringToBytes_Aes(card.NumTarjeta);
                    if (numCardEncripted == null)
                    {
                        throw new Exception("No se pudo encriptar el número de tarjeta " + dataInput.codeClient);
                    }

                    // Inicia las tareas en paralelo
                    var taskEstadoCuenta = _soapService.GetStatusAccountAsync(dataInput.Month, dataInput.Year, numCardEncripted);
                    Task<VtcObtenerMovimientosCuentaMesResponse> taskMovimientosMes = null;
                    Task<VtcObtenerMovimientosCuentaFechaResponse> taskMovimientosFecha = null;

                    if (day != 0)
                    {
                        Console.WriteLine("Obteniendo movimientos por fecha");
                        taskMovimientosFecha = _soapService.GetMovAccountSpecificDayAsync(dataInput.Month, dataInput.Year, dataInput.Day, numCardEncripted);
                        
                    }
                    else
                    {
                        Console.WriteLine("Obteniendo movimientos por mes");
                        taskMovimientosMes = _soapService.GetAccountMoveMonth(dataInput.Month, dataInput.Year, numCardEncripted);
                    }

                    // Espera que todas las tareas terminen
                    await Task.WhenAll(taskEstadoCuenta, taskMovimientosMes ?? Task.CompletedTask, taskMovimientosFecha ?? Task.CompletedTask);

                    // Asigna los resultados de manera condicional
                    var resultEstCta = await taskEstadoCuenta;
                    dataInput.estadoCuenta = resultEstCta ?? throw new Exception("No se pudo obtener el estado de cuenta " + dataInput.codeClient);

                    if (day != 0)
                    {
                        dataInput.movimientosFecha = await taskMovimientosFecha ?? throw new Exception("No se pudo obtener los movimientos de la fecha " + dataInput.codeClient);
                    }
                    else
                    {
                        dataInput.movimientosMes = await taskMovimientosMes ?? throw new Exception("No se pudo obtener los movimientos del mes " + dataInput.codeClient);
                    }

                    // Validar que se obtuvieron correctamente tanto el estado de cuenta como los movimientos
                    if (dataInput.estadoCuenta == null || (dataInput.movimientosMes == null && dataInput.movimientosFecha == null))
                    {
                        throw new Exception("Datos incompletos para la tarjeta " + dataInput.codeClient);
                    }

                    // Creación del PDF
                    try
                    {
                        PdfHelper createPdf = new PdfHelper(_env);
                        createPdf.CreatePdf(pathPdf, dataInput);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception("Error al crear el PDF para el cliente " + dataInput.codeClient, ex);
                    }
                }
                catch (Exception ex)
                {
                    ExceptionHelper.LogException(ex);
                    continue;  // Continúa con la siguiente tarjeta en caso de error
                }
            }
        }
    }
}
