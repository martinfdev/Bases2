using Microsoft.AspNetCore.Mvc;

namespace AppPdfGenAccountStatus.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View(); // Esto buscará una vista llamada Index.cshtml en Views/Home/
        }
    }
}