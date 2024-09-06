using SoapVstec;

namespace AppPdfGenAccountStatus.Models
{
	public class DataInputModel
	{
		public string codeClient { get; set; }

		public int Month { get; set; }

		public int Year { get; set; }

		public int Day { get; set; }

		public VtcInfoEstCtaTHResponse estadoCuenta { get; set; }

		public VtcObtenerMovimientosCuentaMesResponse movimientosMes { get; set; }

		public VtcObtenerMovimientosCuentaFechaResponse movimientosFecha { get; set; }
	}
}