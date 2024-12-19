const API_URL = import.meta.env.VITE_BASE_ADMIN_URL

// import { dataLogin, dataUser } from '../test/testData' //this is just for testing purposes in development mode

/**
 * Register a new user in the system
 * @param userData - object containing the user data
 * @returns a promise that resolves to the user data if the registration is successful
 * @throws an error if the registration fails
 */
export async function registerUser(userData) {
  console.log(userData)  
  try {
        const response = await fetch(`${API_URL}/admin/register`, {
          method: 'POST',
          headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Error en el registro del usuario.')
        }
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // console.log('userData to send:', userData)
    } catch (error) {
        console.error('Error en registro de usuario:', error)
        throw error
    }
}