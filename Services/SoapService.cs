using System.ServiceModel;
using AppPdfGenAccountStatus.Models;
using Microsoft.Extensions.Options;
using SoapVstec;

namespace AppPdfGenAccountStatus.Services
{
	public class SoapService : ISoapService
	{
		private readonly SoapServiceSettings _soapServiceSettings;
		public SoapService(IOptions<SoapServiceSettings> soapServiceSettings)
		{
			_soapServiceSettings = soapServiceSettings.Value;
		}

		public async Task<VtcInfoEstCtaTHResponse> GetStatusAccountAsync(int mes, int anyo, string cuenta)
		{
			SVCredentials credentials = new SVCredentials
			{
				User = _soapServiceSettings.User,
				Password = _soapServiceSettings.Password,
				NoCliente = _soapServiceSettings.NoCliente
			};
			RequestCorteCuenta requestCorteCuenta = new RequestCorteCuenta
			{
				Anyo = anyo,
				Mes = mes,
				Cuenta = cuenta
			};
			VtcInfoEstCtaTHRequest request = new VtcInfoEstCtaTHRequest
			{
				SVCredentials = credentials,
				request = requestCorteCuenta
			};
			try
			{
				using VstCtaTrxSoapClient _soapClient = new VstCtaTrxSoapClient(VstCtaTrxSoapClient.EndpointConfiguration.VstCtaTrxSoap);
				_soapClient.Endpoint.Address = new EndpointAddress(_soapServiceSettings.Url);
				VtcInfoEstCtaTHResponse response = await _soapClient.VtcInfoEstCtaTHAsync(request);
				if (response != null)
				{
					return response;
				}
				return null;
			}
			catch (Exception ex2)
			{
				Exception ex = ex2;
				throw new Exception("Ocurrió un error al obtener estado de cuenta: ", ex);
			}
		}

		public async Task<VtcObtenerMovimientosCuentaMesResponse> GetAccountMoveMonth(int mes, int anyo, string cuenta)
		{
			SVCredentials credentials = new SVCredentials
			{
				User = _soapServiceSettings.User,
				Password = _soapServiceSettings.Password,
				NoCliente = _soapServiceSettings.NoCliente
			};
			RequestCorteCuenta requestCorteCuenta = new RequestCorteCuenta
			{
				Anyo = anyo,
				Mes = mes,
				Cuenta = cuenta
			};
			VtcObtenerMovimientosCuentaMesRequest request = new VtcObtenerMovimientosCuentaMesRequest
			{
				SVCredentials = credentials,
				request = requestCorteCuenta
			};
			try
			{
				using VstCtaTrxSoapClient _soapClient = new VstCtaTrxSoapClient(VstCtaTrxSoapClient.EndpointConfiguration.VstCtaTrxSoap);
				_soapClient.Endpoint.Address = new EndpointAddress(_soapServiceSettings.Url);
				VtcObtenerMovimientosCuentaMesResponse response = await _soapClient.VtcObtenerMovimientosCuentaMesAsync(request);
				if (response != null)
				{
					return response;
				}
				return null;
			}
			catch (Exception ex2)
			{
				Exception ex = ex2;
				throw new Exception("Error al obtener los movimientos de la cuenta por mes", ex);
			}
		}

		public async Task<VtcObtenerMovimientosCuentaFechaResponse> GetMovAccountSpecificDayAsync(int mes, int anyo, int dia, string cuenta)
		{
			SVCredentials credentials = new SVCredentials
			{
				User = _soapServiceSettings.User,
				Password = _soapServiceSettings.Password,
				NoCliente = _soapServiceSettings.NoCliente
			};
			RequestMovFechaCuenta requestCorteCuenta = new RequestMovFechaCuenta
			{
				Anyo = anyo,
				Mes = mes,
				Dia = dia,
				Cuenta = cuenta
			};
			VtcObtenerMovimientosCuentaFechaRequest request = new VtcObtenerMovimientosCuentaFechaRequest
			{
				SVCredentials = credentials,
				request = requestCorteCuenta
			};
			try
			{
				using VstCtaTrxSoapClient _soapClient = new VstCtaTrxSoapClient(VstCtaTrxSoapClient.EndpointConfiguration.VstCtaTrxSoap);
				_soapClient.Endpoint.Address = new EndpointAddress(_soapServiceSettings.Url);
				VtcObtenerMovimientosCuentaFechaResponse response = await _soapClient.VtcObtenerMovimientosCuentaFechaAsync(request);
				if (response != null)
				{
					return response;
				}
				return null;
			}
			catch (Exception ex2)
			{
				Exception ex = ex2;
				throw new Exception("Error al obtener los movimientos de la cuenta por fecha", ex);
			}
		}
	}
}