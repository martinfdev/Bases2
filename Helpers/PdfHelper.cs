using System.Globalization;
using AppPdfGenAccountStatus.Models;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using SoapVstec;

namespace AppPdfGenAccountStatus.Helpers
{
    public class PdfHelper
    {
        private readonly IWebHostEnvironment _env;

        public PdfHelper(IWebHostEnvironment env)
        {
            _env = env;
        }

        public void CreatePdf(string filePath, DataInputModel data)
        {
            // Obtener el estado de cuenta y los movimientos
            VtcInfoEstCtaTHResponse statement = data.estadoCuenta;
            VtcObtenerMovimientosCuentaMesResponse vtcMovimientosMes = data.movimientosMes;
            VtcObtenerMovimientosCuentaFechaResponse vtcMovimientosFecha = data.movimientosFecha;

            // Validar si el estado de cuenta es null
            if (statement == null)
            {
                throw new Exception("Error al obtener el estado cuenta");
            }

            // Validar si ambos movimientos (mes y fecha) son null
            if (vtcMovimientosMes == null && vtcMovimientosFecha == null)
            {
                throw new Exception("Error al obtener los movimientos, no se pudo generar el reporte");
            }

            // Si los movimientos por fecha no son null, pero los movimientos por mes sí lo son,
            // inicializar vtcMovimientosMes con un nuevo objeto y copiar los datos de movimientos por fecha
            if (vtcMovimientosFecha != null && vtcMovimientosMes == null)
            {
                // Inicializar vtcMovimientosMes utilizando su constructor que acepta un parámetro
                vtcMovimientosMes = new VtcObtenerMovimientosCuentaMesResponse(
                    new SoapVstec.WsMaestroDetalle2OfEncabezadoMovimientosInfoTrxInfoMontosTarjetaInfoFinanciamiento
                    {
                        // Copiar los datos de los movimientos por fecha
                        Detalle = vtcMovimientosFecha.VtcObtenerMovimientosCuentaFechaResult.Detalle,
                        Detalle2 = vtcMovimientosFecha.VtcObtenerMovimientosCuentaFechaResult.Detalle2,
                        InfoFinanciamiento = vtcMovimientosFecha.VtcObtenerMovimientosCuentaFechaResult.InfoFinanciamiento,
                        InfoTran = vtcMovimientosFecha.VtcObtenerMovimientosCuentaFechaResult.InfoTran,
                        Maestro = vtcMovimientosFecha.VtcObtenerMovimientosCuentaFechaResult.Maestro
                    }
                );
            }

            // Validar que el resultado del estado de cuenta no sea null antes de acceder a sus propiedades
            if (statement.VtcInfoEstCtaTHResult == null)
            {
                throw new Exception("Error: VtcInfoEstCtaTHResult es null en el estado de cuenta");
            }

            // Verificar si hay algún error en la transacción de InfoTran
            if (statement.VtcInfoEstCtaTHResult.InfoTran != null && statement.VtcInfoEstCtaTHResult.InfoTran.IsError)
            {
                Console.WriteLine(statement.VtcInfoEstCtaTHResult.InfoTran.ReturnMessage);
                throw new Exception("Error al obtener el estado de cuenta para el cliente " + data.codeClient + " Msg Versatec -> " + statement.VtcInfoEstCtaTHResult.InfoTran.ErrorLog, new Exception(statement.VtcInfoEstCtaTHResult.InfoTran.ReturnMessage));
            }

            // Validar que vtcMovimientosMes y su resultado no sean null antes de acceder
            if (vtcMovimientosMes == null || vtcMovimientosMes.VtcObtenerMovimientosCuentaMesResult == null)
            {
                throw new Exception("Error: Movimientos del mes o su resultado son null");
            }

            // Verificar si hay algún error en la transacción de InfoTran
            if (vtcMovimientosMes.VtcObtenerMovimientosCuentaMesResult.InfoTran != null && vtcMovimientosMes.VtcObtenerMovimientosCuentaMesResult.InfoTran.IsError)
            {
                Console.WriteLine(vtcMovimientosMes.VtcObtenerMovimientosCuentaMesResult.InfoTran.ReturnMessage);
            }


            int day = data.Day == 0 ? 1 : data.Day;
            string month = new DateTime(data.Year, data.Month, day).ToString("MMMM");
            char reference = char.ToUpper(month[0]);
            month = string.Concat(new ReadOnlySpan<char>(ref reference), month.Substring(1));


            //inf creando pdf
            PdfDocument document = new PdfDocument();
            document.Info.Title = "Estado de Cuenta";
            double startX = 48.0;
            double startY = 80.0;
            double marginBottom = 80.0;
            PdfPage page = document.AddPage();
            XGraphics gfx = XGraphics.FromPdfPage(page);

            //size and type font
            XFont fontTitle = new XFont("Arial", 13.0, XFontStyleEx.Bold);
            XFont fontSubtitle = new XFont("Arial", 10.0, XFontStyleEx.Bold);
            XFont fontRegular = new XFont("Arial", 10.0, XFontStyleEx.Regular);
            XFont fontRegularBold = new XFont("Arial", 8.0, XFontStyleEx.Bold);
            XFont fontRegularMin = new XFont("Arial", 8.0, XFontStyleEx.Regular);
            XFont fontTitleBox = new XFont("Arial", 6.0, XFontStyleEx.Bold);
            XFont fontFooter = new XFont("Arial", 6.0, XFontStyleEx.Regular);

            //get logo path
            string logoPath = Path.Combine(_env.ContentRootPath, "Statics", "logo.png");
            XImage logo = XImage.FromFile(logoPath);

            //header of the pdf content
            gfx.DrawImage(logo, page.Width.Point - 240.0, startY, 180.0, 50.0);
            gfx.DrawString("ESTADO DE CUENTA", fontSubtitle, XBrushes.Gray, new XRect(startX, startY, 100.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("TC Visa Platinum Empleados", fontTitle, XBrushes.Black, new XRect(startX + 110.0, startY, 200.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("Resumen del mes: ", fontSubtitle, XBrushes.Black, new XRect(startX, startY + 20.0, 150.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString($"{month} {data.Year}", fontRegular, XBrushes.Black, new XRect(startX + 110.0, startY + 20.0, 200.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("Nombre del cliente: ", fontSubtitle, XBrushes.Black, new XRect(startX, startY + 30.0, 150.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.Nombre ?? "", fontRegular, XBrushes.Black, new XRect(startX + 110.0, startY + 30.0, 200.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("No. de cuenta: ", fontSubtitle, XBrushes.Black, new XRect(startX, startY + 40.0, 150.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.Cuenta ?? "", fontRegular, XBrushes.Black, new XRect(startX + 110.0, startY + 40.0, 200.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("No. de tarjeta: ", fontSubtitle, XBrushes.Black, new XRect(startX, startY + 50.0, 160.0, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.Tarjeta ?? "", fontRegular, XBrushes.Black, new XRect(startX + 110.0, startY + 50.0, 200.0, 20.0), XStringFormats.TopLeft);
            startY += 92.0;
            double boxWidth = 84.0;
            double boxHeight = 28.0;
            double padding = 2.0;
            DrawLabelBox(gfx, startX, startY, boxWidth + 130.0, boxHeight + 96.5, fillColor: false);
            DrawLabelBox(gfx, startX, startY, boxWidth + 130.0, boxHeight - 14.5, fillColor: true);

            // Resumen de la cuenta
            gfx.DrawString("Informacion de la cuenta", fontRegularBold, XBrushes.White, new XRect(startX + 7.0, startY + 3.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Q", fontRegularBold, XBrushes.White, new XRect(startX + 135.0, startY + 3.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("US$", fontRegularBold, XBrushes.White, new XRect(startX + 175.0, startY + 3.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Saldo anterior", fontRegularMin, XBrushes.Black, new XRect(startX + 7.0, startY + 20.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.SdoUltCorteMN.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 155.0, startY + 20.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.SdoUltCorteME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 200.0, startY + 20.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("Pagos y créditos", fontRegularMin, XBrushes.Black, new XRect(startX + 7.0, startY + 33.0, 5.0, 10.0), XStringFormats.TopLeft);
            XGraphics xGraphics = gfx;
            decimal num;
            if (statement == null)
            {
                decimal? obj = statement?.VtcInfoEstCtaTHResult.Model.CreditosExtraML;
                num = ((decimal?)0m + obj).GetValueOrDefault();
            }
            else
            {
                num = statement.VtcInfoEstCtaTHResult.Model.CreditosMesML;
            }
            decimal num2 = num;
            xGraphics.DrawString(num2.ToString("F2"), fontRegularMin, XBrushes.Black, new XRect(startX + 155.0, startY + 33.0, 5.0, 10.0), XStringFormats.TopRight);
            XGraphics xGraphics2 = gfx;
            decimal num3;
            if (statement == null)
            {
                decimal? obj2 = statement?.VtcInfoEstCtaTHResult.Model.CreditosExtraME;
                num3 = ((decimal?)0m + obj2).GetValueOrDefault();
            }
            else
            {
                num3 = statement.VtcInfoEstCtaTHResult.Model.CreditosMesME;
            }
            num2 = num3;

            // Draw part 1 of contet header info
            xGraphics2.DrawString(num2.ToString("F2"), fontRegularMin, XBrushes.Black, new XRect(startX + 200.0, startY + 33.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("Compras y retiros", fontRegularMin, XBrushes.Black, new XRect(startX + 7.0, startY + 46.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.ConsumoMesML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 155.0, startY + 46.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.ConsumoMesME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 200.0, startY + 46.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("Otros cargos", fontRegularMin, XBrushes.Black, new XRect(startX + 7.0, startY + 59.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.OtrosCargosML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 155.0, startY + 59.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.OtrosCargosME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 200.0, startY + 59.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("Visacuotas/Extrafin", fontRegularMin, XBrushes.Black, new XRect(startX + 7.0, startY + 72.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.CreditosExtraML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 155.0, startY + 72.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.CreditosExtraME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 200.0, startY + 72.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("Saldo al corte", fontRegularMin, XBrushes.Black, new XRect(startX + 7.0, startY + 85.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.SaldoFinalML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 155.0, startY + 85.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.SaldoFinalME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 200.0, startY + 85.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("Numero de coutas vencidas", fontRegularMin, XBrushes.Black, new XRect(startX + 7.0, startY + 98.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.NumCuotasVencidasML.ToString() ?? "0", fontRegularMin, XBrushes.Black, new XRect(startX + 155.0, startY + 98.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.NumCuotasVencidasME.ToString() ?? "0", fontRegularMin, XBrushes.Black, new XRect(startX + 200.0, startY + 98.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("Pago vencido", fontRegularMin, XBrushes.Black, new XRect(startX + 7.0, startY + 111.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model.SaldoMoraML.ToString() ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 155.0, startY + 111.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model.SaldoMoraME.ToString() ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 200.0, startY + 111.0, 5.0, 10.0), XStringFormats.TopRight);

            //Draw part 2 of content header info
            XBrush subTitleBoxColor = new XSolidBrush(XColor.FromCmyk(1.0, 0.68, 0.0, 0.12));
            gfx.DrawString("Pago de contado", fontTitleBox, subTitleBoxColor, new XRect(startX + 220.0 + 20.0, startY - 7.0, boxWidth, 20.0), XStringFormats.TopLeft);
            DrawLabelBox(gfx, startX + 220.0, startY, boxWidth - 2.0, boxHeight, fillColor: false);
            gfx.DrawString("Q", fontRegularBold, XBrushes.Black, new XRect(startX + 225.0, startY + 5.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("US$", fontRegularBold, XBrushes.Black, new XRect(startX + 225.0, startY + 15.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.PagocontadoML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 230.0 + 63.0, startY + 5.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.PagocontadoME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 230.0 + 63.0, startY + 15.0, 5.0, 10.0), XStringFormats.TopRight);

            gfx.DrawString("Pago mínimo", fontTitleBox, subTitleBoxColor, new XRect(startX + 220.0 + 20.0 + boxWidth + 5.0, startY - 7.0, boxWidth, 20.0), XStringFormats.TopLeft);
            DrawLabelBox(gfx, startX + 220.0 + boxWidth, startY, boxWidth - 2.0, boxHeight, fillColor: false);
            gfx.DrawString("Q", fontRegularBold, XBrushes.Black, new XRect(startX + 310.0, startY + 5.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("US$", fontRegularBold, XBrushes.Black, new XRect(startX + 310.0, startY + 15.0, 5.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.PagoMinimoML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 377.0, startY + 5.0, 5.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.PagoMinimoME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 377.0, startY + 15.0, 5.0, 10.0), XStringFormats.TopRight);

            gfx.DrawString("Fecha de corte", fontTitleBox, subTitleBoxColor, new XRect(startX + 220.0 + boxWidth * 2.0 + 5.0, startY - 7.0, boxWidth, 20.0), XStringFormats.TopLeft);
            DrawLabelBox(gfx, startX + 220.0 + boxWidth * 2.0, startY, boxWidth - 35.0, boxHeight, fillColor: false);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.FechaCorte ?? "", fontRegularMin, XBrushes.Black, new XRect(startX + 410.0, startY + 10.0, 5.0, 10.0), XStringFormats.Center);
            gfx.DrawString("Fecha", fontTitleBox, subTitleBoxColor, new XRect(startX + 220.0 + padding * 6.0 + boxWidth * 2.0 + 5.0 + (boxWidth - 35.0), startY - 14.0, boxWidth, 20.0), XStringFormats.TopLeft);

            gfx.DrawString("máxima de pago", fontTitleBox, subTitleBoxColor, new XRect(startX + 220.0 + padding + boxWidth * 2.0 + (boxWidth - 35.0), startY - 7.0, boxWidth, 20.0), XStringFormats.TopLeft);
            DrawLabelBox(gfx, startX + 220.0 + boxWidth * 2.0 + padding + (boxWidth - 35.0), startY, boxWidth - 35.0, boxHeight, fillColor: false);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.FecMaxPago ?? "", fontRegularMin, XBrushes.Black, new XRect(startX + 460.0, startY + 10.0, 5.0, 10.0), XStringFormats.Center);
            DrawLabelBox(gfx, startX + 220.0, startY + boxHeight + padding * 2.0 + 1.0, boxWidth * 2.0 - 35.5, boxHeight * 3.0 + 7.5, fillColor: false);
            DrawLabelBox(gfx, startX + 220.0, startY + boxHeight + padding * 2.0 + 1.0, boxWidth * 2.0 - 35.5, boxHeight - 14.5, fillColor: true);

            gfx.DrawString("Programa de lealtad", fontRegularBold, XBrushes.White, new XRect(startX + 220.0 + 5.0, startY + boxHeight + padding * 3.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("Puntos anteriores", fontRegularMin, XBrushes.Black, new XRect(startX + 225.0, startY + boxHeight + padding * 11.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.PuntosSaldoAnterior.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 225.0 + 40.0, startY + boxHeight + padding * 11.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            gfx.DrawString("(+) Acumulados del mes", fontRegularMin, XBrushes.Black, new XRect(startX + 225.0, startY + boxHeight + padding * 20.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.PuntosMontoGanado.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 225.0 + 40.0, startY + boxHeight + padding * 20.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            gfx.DrawString("(-) Compras con puntos", fontRegularMin, XBrushes.Black, new XRect(startX + 225.0, startY + boxHeight + padding * 29.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.ComprasPorPuntos.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 225.0 + 40.0, startY + boxHeight + padding * 29.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            gfx.DrawString("Puntos disponibles", fontRegularMin, XBrushes.Black, new XRect(startX + 225.0, startY + boxHeight + padding * 38.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.PuntosSaldoActual.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 225.0 + 40.0, startY + boxHeight + padding * 38.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            DrawLabelBox(gfx, startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 1.0, startY + boxHeight + padding * 2.0 + 1.0, boxWidth * 2.0 - 35.5, boxHeight * 2.0 - 3.5, fillColor: false);
            DrawLabelBox(gfx, startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 1.0, startY + boxHeight + padding * 2.0 + 1.0, boxWidth * 2.0 - 35.5, boxHeight - 14.5, fillColor: true);

            gfx.DrawString("Tasa de interés", fontRegularBold, XBrushes.White, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0, startY + boxHeight + padding * 3.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("Q(%)", fontRegularBold, XBrushes.White, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0 + 72.0, startY + boxHeight + padding * 3.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("US$(%)", fontRegularBold, XBrushes.White, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 102.0, startY + boxHeight + padding * 3.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("Financiamiento", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0, startY + boxHeight + padding * 10.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.IntAnualML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0 + 15.0, startY + boxHeight + padding * 10.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.IntAnualME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0 + 40.0, startY + boxHeight + padding * 10.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            gfx.DrawString("Mora", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0, startY + boxHeight + padding * 16.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.IntAnualML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0 + 15.0, startY + boxHeight + padding * 16.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.IntAnualME.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0 + 40.0, startY + boxHeight + padding * 16.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            gfx.DrawString("Tasa anual equivalente", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0, startY + boxHeight + padding * 22.0 + 1.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.TasaAnualEquivalente.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0 + 15.0, startY + boxHeight + padding * 22.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.TasaAnualEquivalente.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0 + 40.0, startY + boxHeight + padding * 22.0 + 1.0, boxWidth, 20.0), XStringFormats.TopRight);
            DrawLabelBox(gfx, startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 1.0, startY + boxHeight * 3.0 - 3.5 + padding * 2.0 + 1.0, boxWidth * 2.0 - 35.5, boxHeight + 11.0, fillColor: false);
            DrawLabelBox(gfx, startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 1.0, startY + boxHeight * 3.0 - 3.5 + padding * 2.0 + 1.0, boxWidth * 2.0 - 35.5, boxHeight - 14.5, fillColor: true);
            gfx.DrawString("Disponibles", fontRegularBold, XBrushes.White, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0, startY + boxHeight * 3.0 + padding * 2.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("Q", fontRegularBold, XBrushes.White, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 105.0, startY + boxHeight * 3.0 + padding * 2.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("Para compras", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0, startY + boxHeight * 3.0 + padding * 9.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString("Para Visacuotas/Extrafin", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0, startY + boxHeight * 3.0 + padding * 14.0, boxWidth, 20.0), XStringFormats.TopLeft);
            gfx.DrawString(statement?.VtcInfoEstCtaTHResult?.Model?.DisponibleML.ToString("F2") ?? "0.00", fontRegularMin, XBrushes.Black, new XRect(startX + 220.0 + boxWidth * 2.0 - 35.5 + padding + 5.0 + 42.0, startY + boxHeight * 3.0 + padding * 11.0, boxWidth, 20.0), XStringFormats.TopRight);

            //Pago Minimo tine que ser una lista
            gfx.DrawString("Pago Minimo", fontRegularBold, XBrushes.Black, new XRect(startX, startY + 127.0, boxWidth, 10.0), XStringFormats.TopLeft);
            DrawLabelBox(gfx, startX, startY + 137.0, 490.0, 18.5, fillColor: true);
            gfx.DrawString("Capital", fontRegularMin, XBrushes.White, new XRect(startX + 26.0, startY + 142.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Intereses por", fontRegularMin, XBrushes.White, new XRect(startX + 90.0, startY + 137.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Servicios", fontRegularMin, XBrushes.White, new XRect(startX + 97.0, startY + 145.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Intereses", fontRegularMin, XBrushes.White, new XRect(startX + 157.5, startY + 137.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Moratorios", fontRegularMin, XBrushes.White, new XRect(startX + 155.5, startY + 145.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Cuota de", fontRegularMin, XBrushes.White, new XRect(startX + 213.0, startY + 137.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Visacuotas", fontRegularMin, XBrushes.White, new XRect(startX + 210.0, startY + 145.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Cuota de", fontRegularMin, XBrushes.White, new XRect(startX + 281.0, startY + 137.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Extrafinanciamiento", fontRegularMin, XBrushes.White, new XRect(startX + 268.0, startY + 145.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Cargo por", fontRegularMin, XBrushes.White, new XRect(startX + 349.0, startY + 137.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Cobranza", fontRegularMin, XBrushes.White, new XRect(startX + 349.0, startY + 145.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Seguro", fontRegularMin, XBrushes.White, new XRect(startX + 399.0, startY + 142.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Pago Minimo", fontRegularMin, XBrushes.White, new XRect(startX + 439.0, startY + 142.0, boxWidth, 10.0), XStringFormats.TopLeft);
            double currentY = startY + 155.0;
            double availableHeight = page.Height.Value - marginBottom;
            List<XGraphics> listgfx = new List<XGraphics>();
            listgfx.Add(gfx);
            DrawContent(startX, ref currentY, ref availableHeight, ref document, ref page, ref gfx, fontRegularMin, 12.0, 0, marginBottom, ref listgfx);

            startY = currentY + 11.0;
            currentY = startY + 18.5;
            DrawLabelBox(gfx, startX, startY, 490.0, 18.5, fillColor: true);
            gfx.DrawString("Fecha de", fontRegularMin, XBrushes.White, new XRect(startX + 15.0, startY, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Operacion", fontRegularMin, XBrushes.White, new XRect(startX + 11.0, startY + 10.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Fecha", fontRegularMin, XBrushes.White, new XRect(startX + 80.0, startY, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Consumo", fontRegularMin, XBrushes.White, new XRect(startX + 77.0, startY + 10.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Detalle Transaccion", fontRegularMin, XBrushes.White, new XRect(startX + 200.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Quetzales", fontRegularMin, XBrushes.White, new XRect(startX + 380.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Dolares", fontRegularMin, XBrushes.White, new XRect(startX + 440.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            DrawContentMain(startX, ref currentY, ref availableHeight, ref document, ref page, ref gfx, fontRegularMin, 12.0, vtcMovimientosMes, marginBottom, ref listgfx);

            gfx.DrawString("Informacion de visacuotas", fontRegularBold, XBrushes.Black, new XRect(startX, currentY, boxWidth, 10.0), XStringFormats.TopLeft);
            startY = currentY + 10.0;
            currentY = startY + 18.5;
            DrawLabelBox(gfx, startX, startY, 490.0, 18.5, fillColor: true);
            gfx.DrawString("Programa", fontRegularMin, XBrushes.White, new XRect(startX + 50.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Moneda", fontRegularMin, XBrushes.White, new XRect(startX + 140.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Fecha de Inicio", fontRegularMin, XBrushes.White, new XRect(startX + 200.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Monto", fontRegularMin, XBrushes.White, new XRect(startX + 293.0, startY + 3.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Autotizado", fontRegularMin, XBrushes.White, new XRect(startX + 287.0, startY + 10.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Plazo", fontRegularMin, XBrushes.White, new XRect(startX + 350.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Tasa de", fontRegularMin, XBrushes.White, new XRect(startX + 390.0, startY + 3.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Interes", fontRegularMin, XBrushes.White, new XRect(startX + 390.0, startY + 10.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Saldo", fontRegularMin, XBrushes.White, new XRect(startX + 450.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            DrawContentVisaCuotas(startX, ref currentY, ref availableHeight, ref document, ref page, ref gfx, fontRegularMin, 12.0, vtcMovimientosMes, marginBottom, ref listgfx);

            gfx.DrawString("Informacion de convenio de pago", fontRegularBold, XBrushes.Black, new XRect(startX, currentY + 10.0, boxWidth, 10.0), XStringFormats.TopLeft);
            startY = currentY + 20.0;
            currentY = startY + 18.5;
            DrawLabelBox(gfx, startX, startY, 490.0, 18.5, fillColor: true);
            gfx.DrawString("Número de", fontRegularMin, XBrushes.White, new XRect(startX + 7.0, startY + 2.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Convenio", fontRegularMin, XBrushes.White, new XRect(startX + 9.0, startY + 9.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Número de", fontRegularMin, XBrushes.White, new XRect(startX + 80.0, startY + 2.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("cuota", fontRegularMin, XBrushes.White, new XRect(startX + 85.0, startY + 9.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Moneda", fontRegularMin, XBrushes.White, new XRect(startX + 140.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Fecha de Inicio", fontRegularMin, XBrushes.White, new XRect(startX + 210.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Monto", fontRegularMin, XBrushes.White, new XRect(startX + 293.0, startY + 2.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Autotizado", fontRegularMin, XBrushes.White, new XRect(startX + 287.0, startY + 9.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Plazo", fontRegularMin, XBrushes.White, new XRect(startX + 350.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Tasa de", fontRegularMin, XBrushes.White, new XRect(startX + 390.0, startY + 2.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Interes", fontRegularMin, XBrushes.White, new XRect(startX + 390.0, startY + 9.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Saldo", fontRegularMin, XBrushes.White, new XRect(startX + 450.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            DrawContentPayConvent(startX, ref currentY, ref availableHeight, ref document, ref page, ref gfx, fontRegularMin, 12.0, 0, marginBottom, ref listgfx);


            gfx.DrawString("Resumen de Retiros de Efectivo", fontRegularBold, XBrushes.Black, new XRect(startX, currentY + 10.0, boxWidth, 10.0), XStringFormats.TopLeft);
            startY = currentY + 21.0;
            currentY = startY + 18.5;
            DrawLabelBox(gfx, startX, startY, 490.0, 18.5, fillColor: true);
            gfx.DrawString("Fecha de", fontRegularMin, XBrushes.White, new XRect(startX + 15.0, startY, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Operacion", fontRegularMin, XBrushes.White, new XRect(startX + 11.0, startY + 10.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Fecha", fontRegularMin, XBrushes.White, new XRect(startX + 80.0, startY, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Consumo", fontRegularMin, XBrushes.White, new XRect(startX + 77.0, startY + 10.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Detalle Transaccion", fontRegularMin, XBrushes.White, new XRect(startX + 200.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Quetzales", fontRegularMin, XBrushes.White, new XRect(startX + 380.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("Dolares", fontRegularMin, XBrushes.White, new XRect(startX + 440.0, startY + 5.0, boxWidth, 10.0), XStringFormats.TopLeft);
            DrawContentGetOutCash(startX, ref currentY, ref availableHeight, ref document, ref page, ref gfx, fontRegularMin, 12.0, vtcMovimientosMes, marginBottom, ref listgfx);
            startY = currentY + 40.0;
            currentY = startY;
            if (currentY + 70.0 > availableHeight)
            {
                page = document.AddPage();
                gfx = XGraphics.FromPdfPage(page);
                listgfx.Add(gfx);
                currentY = 80.0;
                availableHeight = page.Height.Value - marginBottom;
                startY = currentY;
            }
            gfx.DrawString("\"Cuando únicamente se efectúe el pago mínimo, aunque ya no realice consumo adicional alguno, tome en cuenta que el", fontRegularMin, XBrushes.Black, new XRect(startX, currentY, 490.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("plazo para la cancelación de su deuda se extenderá, debido a que, con dicho pago, se cubren primero los intereses,", fontRegularMin, XBrushes.Black, new XRect(startX, currentY + 10.0, 490.0, 10.0), XStringFormats.TopLeft);
            gfx.DrawString("comisiones y otros cargos y, por último, una parte mínima se amortiza a capital\"", fontRegularMin, XBrushes.Black, new XRect(startX, currentY + 20.0, 490.0, 10.0), XStringFormats.TopLeft);
            DrawFooter(gfx, fontFooter, document, ref listgfx);

            document.Save(filePath);
            document.Close();
        }

        private static void DrawLabelBox(XGraphics gfx, double x, double y, double width, double height, bool fillColor)
        {
            XColor borderColor = XColor.FromArgb(0, 14, 119, 187);
            if (fillColor)
            {
                XBrush fillBrush = new XSolidBrush(XColor.FromArgb(255, 14, 119, 187));
                gfx.DrawRectangle(new XPen(borderColor, 1.0), fillBrush, x, y, width, height);
            }
            else
            {
                gfx.DrawRectangle(new XPen(borderColor, 1.0), new XSolidBrush(XColor.FromArgb(255, 255, 255)), x, y, width, height);
            }
        }

        private static void DrawFooter(XGraphics gfx, XFont font, PdfDocument document, ref List<XGraphics> listgfx)
        {
            int pageCount = document.PageCount;
            for (int i = 0; i < pageCount; i++)
            {
                PdfPage page = document.Pages[i];
                gfx = listgfx[i];
                string currentDateAndTime = DateTime.Now.ToString("dd/MM/yyyy h:mm:ss tt", CultureInfo.InvariantCulture);
                gfx.DrawString(" Fecha/Hora de Impresión: " + currentDateAndTime, font, XBrushes.Black, new XRect(48.0, page.Height.Point - 30.0, 100.0, 20.0), XStringFormats.TopLeft);
                string pageNumberText = $"Página {i + 1} de {pageCount}";
                gfx.DrawString(pageNumberText, font, XBrushes.Black, new XRect(page.Width.Point - 110.0, page.Height.Point - 30.0, 50.0, 20.0), XStringFormats.TopRight);
            }
        }

        private static void DrawContent(double startX, ref double startY, ref double availableHeight, ref PdfDocument document, ref PdfPage page, ref XGraphics gfx, XFont font, double SpaceBetweenLine, int Numblines, double marginBottom, ref List<XGraphics> listgfx)
        {
            double currentY = startY;
            for (int i = 0; i < Numblines; i++)
            {
                if (currentY > availableHeight)
                {
                    DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                    DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                    page = document.AddPage();
                    gfx = XGraphics.FromPdfPage(page);
                    listgfx.Add(gfx);
                    currentY = 80.0;
                    availableHeight = page.Height.Point - marginBottom;
                }
                gfx.DrawString("100.00", font, XBrushes.Black, new XRect(startX + 23.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("10.00", font, XBrushes.Black, new XRect(startX + 90.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("10.00", font, XBrushes.Black, new XRect(startX + 157.5, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("10.00", font, XBrushes.Black, new XRect(startX + 213.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("10.00", font, XBrushes.Black, new XRect(startX + 281.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("10.00", font, XBrushes.Black, new XRect(startX + 349.0, currentY + 5.0, 20.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("10.00", font, XBrushes.Black, new XRect(startX + 399.0, currentY + 5.0, 25.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("10.00", font, XBrushes.Black, new XRect(startX + 439.0, currentY + 5.0, 35.0, 10.0), XStringFormats.TopRight);
                DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                currentY += SpaceBetweenLine;
            }
            DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
            DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
            DrawingHorizontalLine(gfx, startX, currentY + SpaceBetweenLine, 490.0, 1.0);
            startY = currentY + SpaceBetweenLine;
        }

        private static void DrawContentMain(double startX, ref double startY, ref double availableHeight, ref PdfDocument document, ref PdfPage page, ref XGraphics gfx, XFont font, double SpaceBetweenLine, VtcObtenerMovimientosCuentaMesResponse vtcObtenerMovimientosCuentaMes, double marginBottom, ref List<XGraphics> listgfx)
        {
            InfoTrx[] details = vtcObtenerMovimientosCuentaMes?.VtcObtenerMovimientosCuentaMesResult?.Detalle ?? Array.Empty<InfoTrx>();
            InfoMontosTarjeta[] details2 = vtcObtenerMovimientosCuentaMes?.VtcObtenerMovimientosCuentaMesResult?.Detalle2 ?? Array.Empty<InfoMontosTarjeta>();
            double currentY = startY;
            for (int i = 0; i < details.Length; i++)
            {
                if (currentY > availableHeight)
                {
                    DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                    DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                    page = document.AddPage();
                    gfx = XGraphics.FromPdfPage(page);
                    listgfx.Add(gfx);
                    currentY = 80.0;
                    availableHeight = page.Height.Point - marginBottom;
                }
                gfx.DrawString(details[i].FechaOrigen, font, XBrushes.Black, new XRect(startX + 11.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                gfx.DrawString(details[i].FechaProceso, font, XBrushes.Black, new XRect(startX + 70.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                gfx.DrawString(details[i].Descripcion, font, XBrushes.Black, new XRect(startX + 130.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                if (details[i].Moneda.ToLower() == "quetzales")
                {
                    gfx.DrawString(details[i]?.MtoTra.ToString("F2") ?? "0.00", font, XBrushes.Black, new XRect(startX + 380.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                    gfx.DrawString("0.00", font, XBrushes.Black, new XRect(startX + 430.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                }
                else
                {
                    gfx.DrawString("0.00", font, XBrushes.Black, new XRect(startX + 380.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                    gfx.DrawString(details[i]?.MtoTra.ToString("F2") ?? "0.00", font, XBrushes.Black, new XRect(startX + 430.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                }
                DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                currentY += SpaceBetweenLine;
            }
            decimal suma_comprasML = default(decimal);
            decimal suma_comprasME = default(decimal);
            decimal suma_pagosML = default(decimal);
            decimal suma_pagosME = default(decimal);
            decimal suma_comprasConPuntosML = default(decimal);
            decimal suma_comprasConPuntosME = default(decimal);
            InfoTrx[] array = details;
            foreach (InfoTrx infTrx in array)
            {
                if (infTrx.Moneda.ToLower() == "quetzales")
                {
                    suma_comprasML += infTrx.MtoTra;
                }
                else
                {
                    suma_comprasME += infTrx.MtoTra;
                }
            }
            InfoMontosTarjeta[] array2 = details2;
            foreach (InfoMontosTarjeta infoMontosTarjeta in array2)
            {
                suma_comprasML += infoMontosTarjeta.ComprasML;
                suma_comprasME += infoMontosTarjeta.ComprasME;
                suma_pagosML += infoMontosTarjeta.PagosML;
                suma_pagosME += infoMontosTarjeta.PagosME;
                suma_comprasConPuntosML += infoMontosTarjeta.ComprasPuntosML;
                suma_comprasConPuntosME += infoMontosTarjeta.ComprasPuntosME;
            }
            int rows = 5;
            XFont fontRegularBold;
            if (currentY + (double)rows * SpaceBetweenLine < availableHeight)
            {
                for (int i = 0; i < rows; i++)
                {
                    DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                    DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                    currentY += SpaceBetweenLine;
                }
                fontRegularBold = new XFont("Arial", 8.0, XFontStyleEx.Bold);
                gfx.DrawString("SUMA COMPRAS", fontRegularBold, XBrushes.Black, new XRect(startX + 330.0, currentY - SpaceBetweenLine * (double)(rows - 1), 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString(suma_comprasML.ToString("F2"), fontRegularBold, XBrushes.Black, new XRect(startX + 380.0, currentY - SpaceBetweenLine * (double)(rows - 1), 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString(suma_comprasME.ToString("F2"), fontRegularBold, XBrushes.Black, new XRect(startX + 430.0, currentY - SpaceBetweenLine * (double)(rows - 1), 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("SUMA COMPRAS CON PUNTOS", fontRegularBold, XBrushes.Black, new XRect(startX + 330.0, currentY - SpaceBetweenLine * (double)(rows - 2), 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString(suma_comprasConPuntosML.ToString("F2"), fontRegularBold, XBrushes.Black, new XRect(startX + 380.0, currentY - SpaceBetweenLine * (double)(rows - 2), 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString(suma_comprasConPuntosME.ToString("F2"), fontRegularBold, XBrushes.Black, new XRect(startX + 430.0, currentY - SpaceBetweenLine * (double)(rows - 2), 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("SUMA PAGOS", fontRegularBold, XBrushes.Black, new XRect(startX + 330.0, currentY - SpaceBetweenLine * (double)(rows - 3), 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString(suma_pagosML.ToString("F2"), fontRegularBold, XBrushes.Black, new XRect(startX + 380.0, currentY - SpaceBetweenLine * (double)(rows - 3), 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString(suma_pagosME.ToString("F2"), fontRegularBold, XBrushes.Black, new XRect(startX + 430.0, currentY - SpaceBetweenLine * (double)(rows - 3), 30.0, 10.0), XStringFormats.TopRight);
                DrawingHorizontalLine(gfx, startX, currentY, 490.0, 1.0);
                startY = currentY + SpaceBetweenLine;
                return;
            }
            DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
            DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
            page = document.AddPage();
            gfx = XGraphics.FromPdfPage(page);
            listgfx.Add(gfx);
            currentY = 80.0;
            availableHeight = page.Height.Point - marginBottom;
            for (int i = 0; i < rows; i++)
            {
                DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                currentY += SpaceBetweenLine;
            }
            fontRegularBold = new XFont("Arial", 8.0, XFontStyleEx.Bold);
            gfx.DrawString("SUMA COMPRAS", fontRegularBold, XBrushes.Black, new XRect(startX + 350.0, currentY - SpaceBetweenLine * (double)(rows - 1), 30.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(suma_comprasML.ToString(), fontRegularBold, XBrushes.Black, new XRect(startX + 380.0, currentY - SpaceBetweenLine * (double)(rows - 1), 30.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(suma_comprasME.ToString(), fontRegularBold, XBrushes.Black, new XRect(startX + 430.0, currentY - SpaceBetweenLine * (double)(rows - 1), 30.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("SUMA COMPRAS CON PUNTOS", fontRegularBold, XBrushes.Black, new XRect(startX + 350.0, currentY - SpaceBetweenLine * (double)(rows - 2), 30.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(suma_comprasConPuntosML.ToString(), fontRegularBold, XBrushes.Black, new XRect(startX + 380.0, currentY - SpaceBetweenLine * (double)(rows - 2), 30.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(suma_comprasConPuntosME.ToString(), fontRegularBold, XBrushes.Black, new XRect(startX + 430.0, currentY - SpaceBetweenLine * (double)(rows - 2), 30.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString("SUMA PAGOS", fontRegularBold, XBrushes.Black, new XRect(startX + 350.0, currentY - SpaceBetweenLine * (double)(rows - 3), 30.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(suma_pagosML.ToString(), fontRegularBold, XBrushes.Black, new XRect(startX + 380.0, currentY - SpaceBetweenLine * (double)(rows - 3), 30.0, 10.0), XStringFormats.TopRight);
            gfx.DrawString(suma_pagosME.ToString(), fontRegularBold, XBrushes.Black, new XRect(startX + 430.0, currentY - SpaceBetweenLine * (double)(rows - 3), 30.0, 10.0), XStringFormats.TopRight);
            DrawingHorizontalLine(gfx, startX, currentY, 490.0, 1.0);
            startY = currentY + SpaceBetweenLine;
        }

        private static void DrawContentVisaCuotas(double startX, ref double startY, ref double availableHeight, ref PdfDocument document, ref PdfPage page, ref XGraphics gfx, XFont font, double SpaceBetweenLine, VtcObtenerMovimientosCuentaMesResponse vtcObtenerMovimientosCuentaMes, double marginBottom, ref List<XGraphics> listgfx)
        {
            InfoFinanciamiento[] financiamiento = vtcObtenerMovimientosCuentaMes?.VtcObtenerMovimientosCuentaMesResult?.InfoFinanciamiento ?? Array.Empty<InfoFinanciamiento>();
            double currentY = startY;
            for (int i = 0; i < financiamiento.Length; i++)
            {
                if (currentY > availableHeight)
                {
                    DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                    DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                    page = document.AddPage();
                    gfx = XGraphics.FromPdfPage(page);
                    currentY = 80.0;
                    availableHeight = page.Height.Point - marginBottom;
                }
                gfx.DrawString(financiamiento[i]?.Programa ?? "", font, XBrushes.Black, new XRect(startX + 5.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                gfx.DrawString(financiamiento[i]?.Moneda ?? "", font, XBrushes.Black, new XRect(startX + 140.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                gfx.DrawString(financiamiento[i]?.FechaOrigen ?? "", font, XBrushes.Black, new XRect(startX + 195.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                gfx.DrawString(financiamiento[i]?.MtoDesembolsado.ToString("F2") ?? "0.00", font, XBrushes.Black, new XRect(startX + 290.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString(financiamiento[i]?.Plazo ?? "", font, XBrushes.Black, new XRect(startX + 343.0, currentY + 5.0, 20.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString(financiamiento[i]?.TasaInteres.ToString("F2") ?? "0.00", font, XBrushes.Black, new XRect(startX + 390.0, currentY + 5.0, 25.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("0.00", font, XBrushes.Black, new XRect(startX + 439.0, currentY + 5.0, 35.0, 10.0), XStringFormats.TopRight);
                DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                currentY += SpaceBetweenLine;
            }
            DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
            DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
            DrawingHorizontalLine(gfx, startX, currentY + SpaceBetweenLine, 490.0, 1.0);
            startY = currentY + SpaceBetweenLine;
        }

        private static void DrawContentPayConvent(double startX, ref double startY, ref double availableHeight, ref PdfDocument document, ref PdfPage page, ref XGraphics gfx, XFont font, double SpaceBetweenLine, int Numblines, double marginBottom, ref List<XGraphics> listgfx)
        {
            double currentY = startY;
            for (int i = 0; i < Numblines; i++)
            {
                if (currentY > availableHeight)
                {
                    DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                    DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                    page = document.AddPage();
                    gfx = XGraphics.FromPdfPage(page);
                    listgfx.Add(gfx);
                    currentY = 80.0;
                    availableHeight = page.Height.Point - marginBottom;
                }
                gfx.DrawString("234.00", font, XBrushes.Black, new XRect(startX + 15.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("QUETZALES", font, XBrushes.Black, new XRect(startX + 140.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                gfx.DrawString("45", font, XBrushes.Black, new XRect(startX + 75.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("20/03/2024", font, XBrushes.Black, new XRect(startX + 213.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                gfx.DrawString("1,299.00", font, XBrushes.Black, new XRect(startX + 290.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("6", font, XBrushes.Black, new XRect(startX + 343.0, currentY + 5.0, 20.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("0.00", font, XBrushes.Black, new XRect(startX + 390.0, currentY + 5.0, 25.0, 10.0), XStringFormats.TopRight);
                gfx.DrawString("216.50", font, XBrushes.Black, new XRect(startX + 439.0, currentY + 5.0, 35.0, 10.0), XStringFormats.TopRight);
                DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                currentY += SpaceBetweenLine;
            }
            DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
            DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
            DrawingHorizontalLine(gfx, startX, currentY + SpaceBetweenLine, 490.0, 1.0);
            startY = currentY + SpaceBetweenLine;
        }

        private static void DrawContentGetOutCash(double startX, ref double startY, ref double availableHeight, ref PdfDocument document, ref PdfPage page, ref XGraphics gfx, XFont font, double SpaceBetweenLine, VtcObtenerMovimientosCuentaMesResponse vtcObtenerMovimientosCuentaMes, double marginBottom, ref List<XGraphics> listgfx)
        {
            InfoTrx[] listTrx = vtcObtenerMovimientosCuentaMes?.VtcObtenerMovimientosCuentaMesResult?.Detalle ?? Array.Empty<InfoTrx>();

            double currentY = startY;
            for (int i = 0; i < listTrx.Length; i++)
            {
                if (currentY > availableHeight)
                {
                    DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                    DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                    page = document.AddPage();
                    gfx = XGraphics.FromPdfPage(page);
                    listgfx.Add(gfx);
                    currentY = 80.0;
                    availableHeight = page.Height.Point - marginBottom;
                }

                //Nota actualizar este codigo al codigo de retiro de efectivo o codigos que se necesiten para el retiro de efectivo
                if (listTrx[i].CodTra == "07")
                {
                    gfx.DrawString(listTrx[i]?.FechaProceso ?? "", font, XBrushes.Black, new XRect(startX + 11.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                    gfx.DrawString(listTrx[i]?.FechaOrigen ?? "", font, XBrushes.Black, new XRect(startX + 70.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                    gfx.DrawString(listTrx[i]?.Descripcion ?? "", font, XBrushes.Black, new XRect(startX + 130.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopLeft);
                    if (listTrx[i].Moneda.ToUpper() == "QUETZAL")
                    {
                        gfx.DrawString(listTrx[i].MtoTra.ToString("F2") ?? "0.00", font, XBrushes.Black, new XRect(startX + 380.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                        gfx.DrawString("0.00", font, XBrushes.Black, new XRect(startX + 430.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                    }
                    else
                    {
                        gfx.DrawString("0.00", font, XBrushes.Black, new XRect(startX + 380.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                        gfx.DrawString(listTrx[i].MtoTra.ToString("F2") ?? "0.00", font, XBrushes.Black, new XRect(startX + 430.0, currentY + 5.0, 30.0, 10.0), XStringFormats.TopRight);
                    }
                    DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
                    DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
                    currentY += SpaceBetweenLine;
                }
            }
            DrawingVerticalLine(gfx, startX, currentY, SpaceBetweenLine, 1.0);
            DrawingVerticalLine(gfx, startX + 490.0, currentY, SpaceBetweenLine, 1.0);
            DrawingHorizontalLine(gfx, startX, currentY + SpaceBetweenLine, 490.0, 1.0);
            startY = currentY + SpaceBetweenLine;
        }

        private static void DrawingVerticalLine(XGraphics gfx, double startX, double startY, double length, double thickness)
        {
            XPen pen = new XPen(XColor.FromArgb(0, 14, 119, 187), thickness);
            gfx.DrawLine(pen, startX, startY, startX, startY + length);
        }

        private static void DrawingHorizontalLine(XGraphics gfx, double startX, double startY, double length, double thickness)
        {
            XPen pen = new XPen(XColor.FromArgb(0, 14, 119, 187), thickness);
            gfx.DrawLine(pen, startX, startY, startX + length, startY);
        }
    }
}