import { useState } from 'react'

import { loginUser } from '../../services/authUser'

const LoginForm = () => {
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    let tempErrors = {}
    if (!credentials.email) {
      tempErrors.email = 'El correo electrónico es requerido.'
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      tempErrors.email = 'El correo electrónico es inválido.'
    }
    if (!credentials.password) {
      tempErrors.password = 'La contraseña es requerida.'
    } else if (credentials.password.length < 6) {
      tempErrors.password = 'La contraseña debe tener al menos 6 caracteres.'
    }
    return tempErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      try {
        
        console.log('Credenciales enviadas:', credentials)
        await loginUser(credentials)
        // Redirigir o realizar otras acciones tras el inicio de sesión exitoso
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        // Manejar errores de inicio de sesión
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className=" flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Campo de Correo Electrónico */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="tucorreo@ejemplo.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="********"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-blue-600 hover:underline text-sm"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
