using SoapVstec;

namespace AppPdfGenAccountStatus.Services
{
	public interface ISoapService
	{
		Task<VtcInfoEstCtaTHResponse> GetStatusAccountAsync(int mes, int ayo, string cuenta);

		Task<VtcObtenerMovimientosCuentaMesResponse> GetAccountMoveMonth(int mes, int anyo, string cuenta);

		Task<VtcObtenerMovimientosCuentaFechaResponse> GetMovAccountSpecificDayAsync(int anyo, int mes, int dia, string cuenta);
	}
}