const API_URL = import.meta.env.VITE_API_URL

import {dataLogin, dataUser} from '../test/testData'


/**
 * Initiate a login request to the server
 * @parama credentials - object containing email and password
 * @returns a promise that resolves to the user data if the login is successful
 * @throws an error if the login fails
 */

export async function loginUser(credentials) {
    try {
        // const response = await fetch(`${API_BASE_URL}/login`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(credentials),
        // })
    
        // const data = await response.json()
    
        // if (!response.ok) {
        //   throw new Error(data.error || 'Error en el inicio de sesión.')
        // }

        const data = dataLogin
        const { token, message } = data
        // Almacenar el token en localStorage para futuras peticiones
        localStorage.setItem('token', token)
        return { message }
      } catch (error) {
        console.error('Error en login:', error)
        throw error
      }
}