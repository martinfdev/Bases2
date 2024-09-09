using AppPdfGenAccountStatus.Services;
using AppPdfRep.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace AppPdfGenAccountStatus.Controllers
{

	[ApiController]
	[Route("[controller]")]
	public class PdfController : ControllerBase
	{
		private readonly PdfGenerationService _pdfService;

		public PdfController(PdfGenerationService pdfService)
		{
			_pdfService = pdfService;
		}

		[HttpGet("reporte-mes")]
		public async Task<IActionResult> GenerateReport([FromQuery] int mes, [FromQuery] int anyo)
		{
			if (mes < -1 || mes > 12)
			{
				return BadRequest("El mes debe estar entre 1 y 12.");
			}
			if (anyo < -1)
			{
				return BadRequest("El año debe ser mayor a 1900");
			}
			try
			{
				await _pdfService.GenerateStatusAccMonth(anyo, mes);
			}
			catch (Exception ex)
			{
				ExceptionHelper.LogException(ex);
			}
			return Ok();
		}

        [HttpGet("reporte-fecha")]
        public async Task<IActionResult> GenerateReportdate([FromQuery] int dia, [FromQuery] int mes, [FromQuery] int anyo)
        {
            if(dia < -1 || dia > 30)
			{
                return BadRequest("El día debe estar entre 1 y 30.");
            }
			if (mes < -1 || mes > 12)
            {
                return BadRequest("El mes debe estar entre 1 y 12.");
            }
            if (anyo < -1)
            {
                return BadRequest("El año debe ser mayor a 1900");
            }
            try
            {
                await _pdfService.GenerateStatusAccMonth(anyo, mes, dia);
            }
            catch (Exception ex)
            {
                ExceptionHelper.LogException(ex);
            }
            return Ok();
        }
    }
}