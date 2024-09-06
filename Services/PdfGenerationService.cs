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
					NumTarjeta = "4078563000003711"
				}
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
						Console.WriteLine("No se pudo encriptar el número de tarjeta");
						return;
					}
					Console.WriteLine(numCardEncripted ?? "");
					VtcInfoEstCtaTHResponse resultEstCta = await _soapService.GetStatusAccountAsync(dataInput.Month, dataInput.Year, numCardEncripted);
					if (resultEstCta != null)
					{
						dataInput.estadoCuenta = resultEstCta;
						VtcObtenerMovimientosCuentaMesResponse resultMovMonth = await _soapService.GetAccountMoveMonth(dataInput.Month, dataInput.Year, numCardEncripted);
						if (resultMovMonth != null)
						{
							dataInput.movimientosMes = resultMovMonth;
							try
							{
								PdfHelper createPdf = new PdfHelper(_env);
								createPdf.CreatePdf(pathPdf, dataInput);
							}
							catch (Exception ex)
							{
								throw new Exception("Error", ex);
							}
							continue;
						}
						throw new Exception("Error en la consulta SOAP");
					}
					throw new Exception("Error en la consulta SOAP");
				}
				catch (Exception ex)
				{
					throw new Exception("Error", ex);
				}
			}
		}
	}
}