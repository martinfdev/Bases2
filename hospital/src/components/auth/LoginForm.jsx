import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const LoginForm = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    identificador: '',
    contrasena: '',
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
    if (!credentials.identificador) {
      tempErrors.identificador = 'El correo electrónico es requerido.'
    } else if (!/\S+@\S+\.\S+/.test(credentials.identificador)) {
      tempErrors.identificador = 'El correo electrónico es inválido.'
    }
    if (!credentials.contrasena) {
      tempErrors.contrasena = 'La contraseña es requerida.'
    } else if (credentials.contrasena.length < 6) {
      tempErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres.'
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
        await login(credentials)
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        setErrors({ submit: error.message })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  useEffect(() => {
    if (user) {
      if (user.id_rol === 1) { // Supongamos 1 es admin
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
  }, [user, navigate])

  return (
    <div className=" flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Campo de Correo Electrónico */}
          <div className="mb-4">
            <label htmlFor="identificador" className="block text-gray-600 mb-2">
              Correo Electrónico
            </label>
            <input
              type="identificador"
              name="identificador"
              id="identificador"
              value={credentials.identificador}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.identificador
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
                }`}
              placeholder="tucorreo@ejemplo.com"
              required
            />
            {errors.identificador && (
              <p className="text-red-500 text-sm mt-1">{errors.identificador}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              value={credentials.contrasena}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.contrasena
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
                }`}
              placeholder="********"
              required
            />
            {errors.contrasena && (
              <p className="text-red-500 text-sm mt-1">{errors.contrasena}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
