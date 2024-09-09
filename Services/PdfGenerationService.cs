using AppPdfGenAccountStatus.Helpers;
using AppPdfGenAccountStatus.Models;
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
                    if (numCardEncripted != null)
                    {
                        Console.WriteLine(numCardEncripted ?? "");
                        VtcInfoEstCtaTHResponse resultEstCta = await _soapService.GetStatusAccountAsync(dataInput.Month, dataInput.Year, numCardEncripted);
                        if (resultEstCta != null)
                        {
                            //set state account
                            dataInput.estadoCuenta = resultEstCta;
                        }
                        else
                        {
                            Console.WriteLine("No se pudo obtener el estado de cuenta");
                            throw new Exception("No se pudo obtener el estado de cuenta " + dataInput.codeClient);
                        }
                    }
                    else
                    {
                        Console.WriteLine("No se pudo encriptar el número de tarjeta");
                        throw new Exception("No se pudo encriptar el número de tarjeta " + dataInput.codeClient);
                    }

                    //get movements account month when day is not 0
                    if (day != 0)
                    {
                        VtcObtenerMovimientosCuentaFechaResponse resultMovDate = await _soapService.GetMovAccountSpecificDayAsync(dataInput.Month, dataInput.Year, dataInput.Day, numCardEncripted);
                        if (resultMovDate != null)
                        {
                            dataInput.movimientosFecha = resultMovDate;
                        }
                    }
                    else
                    {
                        VtcObtenerMovimientosCuentaMesResponse resultMovMonth = await _soapService.GetAccountMoveMonth(dataInput.Month, dataInput.Year, numCardEncripted);
                        if (resultMovMonth != null)
                        {
                            dataInput.movimientosMes = resultMovMonth;
                        }
                    }
                    //get movements account status is null 
                    if(dataInput.estadoCuenta == null)
                    {
                        Console.WriteLine("No se pudo obtener el estado de cuenta");
                        throw new Exception("No se pudo obtener el estado de cuenta " + dataInput.codeClient);
                    }
                    //get movements account month is null or movements account date is null
                    if (dataInput.movimientosMes == null && dataInput.movimientosFecha == null)
                    {
                        Console.WriteLine("No se pudo obtener los movimientos de la cuenta");
                        throw new Exception("No se pudo obtener los movimientos de la cuenta " + dataInput.codeClient);
                    }

                    try
                    {
                        PdfHelper createPdf = new PdfHelper(_env);
                        createPdf.CreatePdf(pathPdf, dataInput);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception("Error", ex);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error", ex);
                }
            }
        }
    }
}
