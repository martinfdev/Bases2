using System;
using System.Threading.Tasks;
using AppPdfGenAccountStatus.Services;
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

		[HttpGet("generate-reports")]
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
				throw new Exception("Error", ex);
			}
			return Ok();
		}
	}
}