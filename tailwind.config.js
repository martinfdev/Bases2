/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './Views/**/*.cshtml',    // Incluir todas las vistas Razor
        './Pages/**/*.cshtml',    // Incluir páginas Razor si las usas
        './wwwroot/**/*.js',      // Incluir archivos JavaScript en wwwroot
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}