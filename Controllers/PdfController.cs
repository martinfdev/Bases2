using AppPdfGenAccountStatus.Services;
using AppPdfRep.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace AppPdfGenAccountStatus.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PdfController : Controller
    {
        private readonly PdfGenerationService _pdfService;

        public PdfController(PdfGenerationService pdfService)
        {
            _pdfService = pdfService;
        }

        [HttpGet("reporte-mes")]
        public async Task<IActionResult> GenerateReport([FromQuery] string anyo_mes)
        {
            if (DateTime.TryParse(anyo_mes + "-01", out DateTime fecha))
            {
                int mes = fecha.Month;
                int anyo = fecha.Year;

                Console.WriteLine(anyo);
                Console.WriteLine($"{mes} {anyo}");

                if (mes < 1 || mes > 12)
                {
                    return BadRequest("El mes debe estar entre 1 y 12.");
                }
                if (anyo < 1900)
                {
                    return BadRequest("El año debe ser mayor a 1900.");
                }

                try
                {
                    await _pdfService.GenerateStatusAccMonth(anyo, mes);
                }
                catch (Exception ex)
                {
                    ExceptionHelper.LogException(ex);
                    return StatusCode(500, "Error interno al generar el reporte.");
                }

                // Redirigir a la acción ReportConfirmation
                return RedirectToAction("ReportConfirmation", new { mes = mes, anyo = anyo });
            }
            else
            {
                return BadRequest("Formato de fecha inválido.");
            }
        }

        [HttpGet("reporte-fecha")]
        public async Task<IActionResult> GenerateReportdate([FromQuery] string anyo_mes_dia)
        {
            if (DateTime.TryParse(anyo_mes_dia, out DateTime fecha))
            {
                int mes = fecha.Month;
                int anyo = fecha.Year;
                int dia = fecha.Day;

                if (dia < 1 || dia > 30)
                {
                    return BadRequest("El día debe estar entre 1 y 30.");
                }
                if (mes < 1 || mes > 12)
                {
                    return BadRequest("El mes debe estar entre 1 y 12.");
                }
                if (anyo < 1900)
                {
                    return BadRequest("El año debe ser mayor a 1900.");
                }

                Console.WriteLine($"Fecha dia: {dia} Mes: {mes} Year: {anyo}");

                try
                {
                    await _pdfService.GenerateStatusAccMonth(anyo, mes, dia);
                }
                catch (Exception ex)
                {
                    ExceptionHelper.LogException(ex);
                    return StatusCode(500, "Error interno al generar el reporte.");
                }
                // Redirigir a la acción ReportConfirmation
                return RedirectToAction("ReportConfirmation", new { dia, mes, anyo });
            }
            else
            {
                return BadRequest("Formato de fecha inválido.");
            }
        }

        // Acción para mostrar la confirmación
        public IActionResult ReportConfirmation(int mes, int anyo, int? dia = null)
        {
            if (dia.HasValue)
            {
                ViewData["Message"] = $"El reporte del día {dia.Value}, mes {mes}, año {anyo} se ha generado correctamente.";
            }
            else
            {
                ViewData["Message"] = $"El reporte del mes {mes} del año {anyo} se ha generado correctamente.";
            }

            return View();
        }
    }
}