using AppPdfGenAccountStatus.Data;
using AppPdfGenAccountStatus.Models;
using AppPdfGenAccountStatus.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddScoped<PdfGenerationService>();
builder.Services.AddScoped<ISoapService, SoapService>();
builder.Services.AddScoped<TarjetaService>();
builder.Services.Configure<SoapServiceSettings>(builder.Configuration.GetSection("SoapServiceSettings"));
builder.Services.AddDbContext<ApplicationDbContext>(delegate (DbContextOptionsBuilder options)
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
WebApplication app = builder.Build();
app.UseExceptionHandler(delegate (IApplicationBuilder errorApp)
{
    errorApp.Run(async delegate (HttpContext context)
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "text/plain";
        IExceptionHandlerPathFeature exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        if (exceptionHandlerPathFeature != null)
        {
            Exception exception = exceptionHandlerPathFeature.Error;
            LogException(exception);
            await context.Response.WriteAsync("Se produjo un error en el servidor.");
        }
    });
});

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(delegate (SwaggerUIOptions c)
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";  // Cambia el prefijo de ruta a "swagger"
    });
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

static void LogException(Exception ex)
{
    string logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs", "exceptions.txt");
    Directory.CreateDirectory(Path.GetDirectoryName(logFilePath));
    string logMessage = $"[{DateTime.Now}] Excepción: {ex.Message}{Environment.NewLine}{ex.StackTrace}{Environment.NewLine}{new string('-', 50)}{Environment.NewLine}";
    File.AppendAllText(logFilePath, logMessage);
}
