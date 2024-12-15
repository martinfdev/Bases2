import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getUserData, loginUser } from '../services/authUser'

export const AuthContext = createContext({
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const userData = await getUserData()
          setUser(userData)
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error)
          logout()
        }
      }
    }
    initializeUser()
  }, [])

  const login = async (credentials) => {
    try {
      await loginUser(credentials)
      const userData = await getUserData()
      setUser(userData)
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}