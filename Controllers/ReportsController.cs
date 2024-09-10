using Microsoft.AspNetCore.Mvc;

namespace AppPdfRep.Controllers
{
    public class ReportsController : Controller
    {
        public IActionResult ReportByMonth()
        {
            return View();  // Esto mostrará la vista para el reporte mensual
        }

        public IActionResult ReportByDate()
        {
            return View();  // Esto mostrará la vista para el reporte por fecha
        }
    }
}
