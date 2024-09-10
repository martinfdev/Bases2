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

// Habilitar controladores con vistas (MVC)
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages(); // Opción para Razor Pages, si se necesitan
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Manejo de excepciones
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




// Configuración para desarrollo y producción
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    // Configurar Swagger
    app.UseSwagger();
    app.UseSwaggerUI(delegate (SwaggerUIOptions c)
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";  // Cambia el prefijo de ruta a "swagger"
    });

    // Redirigir la ruta raíz a la vista HTML personalizada
    app.MapGet("/", async context =>
    {
        context.Response.Redirect("/home/index");
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();  // Permitir archivos estáticos como CSS, imágenes, JS
app.UseRouting();

// Configurar registros de rutas de nivel superior en lugar de UseEndpoints
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");  // Ruta por defecto


// Mapear controladores y vistas
app.MapControllers();
app.MapRazorPages();  // Si utilizas Razor Pages

app.Run();

static void LogException(Exception ex)
{
    string logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs", "exceptions.txt");
    Directory.CreateDirectory(Path.GetDirectoryName(logFilePath));

    // Detalles de la excepción
    string logMessage = $@"
        [{DateTime.Now}] 
        Tipo de Excepción: {ex.GetType().Name}
        Mensaje: {ex.Message}
        Inner Exception: {ex.InnerException?.Message}
        StackTrace: {ex.StackTrace}
        ------------------------------------------------";

    // Escribir en archivo de log
    File.AppendAllText(logFilePath, logMessage);
}
