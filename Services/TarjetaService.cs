using AppPdfGenAccountStatus.Data;
using AppPdfGenAccountStatus.Models;
using Microsoft.EntityFrameworkCore;

namespace AppPdfGenAccountStatus.Services
{
    public class TarjetaService
    {
        private readonly ApplicationDbContext _context;

        public TarjetaService(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<List<Tarjeta>> GetAllTarjetasAsync()
        {
            return await _context.Tarjetas.ToListAsync();
        }

        public async Task<List<Tarjeta>> ObtenerTarjetas()
        {
            return await GetAllTarjetasAsync();
        }
    }
}