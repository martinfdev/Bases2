using AppPdfGenAccountStatus.Data;
using AppPdfGenAccountStatus.Models;
using AppPdfGenAccountStatus.Services;
using AppPdfRep.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<PdfGenerationService>();
builder.Services.AddScoped<ISoapService, SoapService>();
builder.Services.AddScoped<TarjetaService>();
builder.Services.Configure<SoapServiceSettings>(builder.Configuration.GetSection("SoapServiceSettings"));
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Manejo de excepciones
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// ** Redirigir cualquier acceso a la ra�z "/" a "/home/index" **
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("/home/index");
        return;
    }
    await next.Invoke();
});

// Habilitar HTTPS
app.UseHttpsRedirection();

// Habilitar archivos est�ticos solo despu�s de la redirecci�n
app.UseStaticFiles();

// Habilitar enrutamiento
app.UseRouting();

// Configuraci�n de autorizaci�n si es necesaria
app.UseAuthorization();

// Configuraci�n para desarrollo y producci�n
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";
    });
}

// Configuraci�n de las rutas
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

// Abrir el navegador autom�ticamente en producci�n
if (app.Environment.IsProduction())
{
    BrowserOperations.OpenBrowser("http://localhost:5000/home/index");
}

app.Run();

static void LogException(Exception ex)
{
    string logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs", "exceptions.txt");
    Directory.CreateDirectory(Path.GetDirectoryName(logFilePath));

    string logMessage = $@"
        [{DateTime.Now}] 
        Tipo de Excepci�n: {ex.GetType().Name}
        Mensaje: {ex.Message}
        Inner Exception: {ex.InnerException?.Message}
        StackTrace: {ex.StackTrace}
        ------------------------------------------------";

    File.AppendAllText(logFilePath, logMessage);
}
