using AppPdfGenAccountStatus.Models;
using Microsoft.EntityFrameworkCore;

namespace AppPdfGenAccountStatus.Data
{
	public class ApplicationDbContext : DbContext
	{
		public DbSet<Tarjeta> Tarjetas { get; set; }

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}
	}
}