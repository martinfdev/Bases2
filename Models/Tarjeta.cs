using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppPdfGenAccountStatus.Models
{
	public class Tarjeta
	{
		[Key]
		[Column(TypeName = "varchar(16)")]
		public string NumTarjeta { get; set; }

		[Column(TypeName = "int")]
		public int Ciclo { get; set; }

		[Column(TypeName = "varchar(50)")]
		public string Afinidad { get; set; }

		[Column(TypeName = "varchar(100)")]
		public string Nombre { get; set; }
	}
}