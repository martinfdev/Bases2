import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-lvh bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x p-4">
      {/* SVG con animation */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-64 h-64 text-white mb-8 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.828 10.172a4 4 0 015.656 0l4.242 4.242a4 4 0 010 5.656l-4.242 4.242a4 4 0 01-5.656 0l-4.242-4.242a4 4 0 010-5.656l4.242-4.242z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 6" />
      </svg>

      {/* Título */}
      <h1 className="text-7xl font-extrabold text-white mb-4 drop-shadow-lg">404</h1>
      <p className="text-2xl text-gray-100 mb-6 text-center max-w-lg">
        ¡Ups! Parece que la página que estás buscando no existe.
      </p>

      <Link
        to="/"
        className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300"
      >
        Regresar al Inicio
      </Link>
    </div>
  )
}

export default NotFound
