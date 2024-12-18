const API_URL = import.meta.env.VITE_BASE_ADMIN_URL

// import {dashboardAdmin, listSpecialty, listUsers, listPatients} from '../test/testData' //this is just for testing purposes in development mode

/**
 * get dashboard data from the server for the admin user
 * @returns a promise that resolves to the dashboard data
 * @throws an error if the request fails
 */
export const getDashboardData = async () => {
    try {
        const response = await fetch(`${API_URL}/admin/dashboard`, {
            method: 'GET', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos del dashboard')
        }
        const data = await response.json()
        // const data = dashboardAdmin
        return data
    } catch (error) {
        console.error('Error al obtener datos del dashboard:', error)
        throw error
    }
}

/**
 * Get the list of specialties from the server
 * @returns a promise that resolves to the list of specialties
 * @throws an error if the request fails
 */
export const getSpecialties = async () => {
    try {
        const response = await fetch(`${API_URL}/admin/obtener_especialidades`, {
            method: 'GET', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos de especialidades')
        }
        const data = await response.json()
        // const data = listSpecialty
        return data
    } catch (error) {
        console.error('Error al obtener datos de especialidades:', error)
        throw error
    }
}

/**
 * create a new specialty in the system
 * @param specialtyData - object containing the specialty data
 * @returns a promise that resolves to the specialty data if the creation is successful
 * @throws an error if the creation fails
 */
export const createSpecialty = async (specialtyData) => {
    try {
        const response = await fetch(`${API_URL}/admin/insertar_especialidad`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(specialtyData),
        })
        // const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || 'Error en la creación de la especialidad.')
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('specialtyData to send:', specialtyData)
        const data = {message: 'Especialidad creada correctamente'}
        return data
    } catch (error) {
        console.error('Error en creación de especialidad:', error)
        throw error
    }
}

/**
 * get the list of users from the server
 * @returns a promise that resolves to the list of users
 * @throws an error if the request fails
 */

export const getUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/admin/lista_usuarios`, {
            method: 'GET', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos de usuarios')
        }
        const data = await response.json()
        // const data = listUsers
        return data
    } catch (error) {
        console.error('Error al obtener datos de usuarios:', error)
        throw error
    }
}

/**
 * get the user data from the server
 * @param userId - the id of the user to get
 * @returns a promise that resolves to the user data
 * @throws an error if the request fails
 */

export const getUser = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/admin/consulta_usuario`, {
            method: 'GET', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({dpi: userId}),
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos del usuario')
        }
        const data = await response.json()
        // const data = listUsers.find(u => u.id === userId)
        return data
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error)
        throw error
    }
}

/**
 * delete a user from the system
 * @param userId - the id of the user to delete (dpi)
 * @returns a promise that resolves to a message if the deletion is successful
 * @throws an error if the deletion fails
 */

export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/admin/eliminacion_usuario`, {
            method: 'DELETE', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({dpi: userId}),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || 'Error en la eliminación del usuario.')
        }
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // const data = {message: 'Usuario eliminado correctamente'}
        return data
    } catch (error) {
        console.error('Error en eliminación de usuario:', error)
        throw error
    }
}

/**
 * update the user data in the system
 * @param userData - object containing the user data
 * @returns a promise that resolves to the updated user data if the update is successful
 * @throws an error if the update fails
 */
export const updateUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/admin/actualizar_usuario`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.Error || 'Error en la actualización del usuario.')
        }
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // console.log('userData to send:', userData)
        // const data = {message: 'Usuario actualizado correctamente'}
        return data
    } catch (error) {
        console.error('Error en actualización de usuario:', error)
        throw error
    }
}

/**
 * create a new patient in the system
 * @param patientData - object containing the user data
 * @returns a promise that resolves to the user data if the creation is successful
 * @throws an error if the creation fails
 */

export const createPatient = async (patientData) => {
    try {
        const response = await fetch(`${API_URL}/admin/crear_paciente`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || 'Error en la creación del paciente.')
        }
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // console.log('patientData to send:', patientData)
        // const data = {message: 'Paciente creado correctamente'}
        return data
    } catch (error) {
        console.error('Error en creación de paciente:', error)
        throw error
    }
}

/**
 * get the list of patients from the server
 * @returns a promise that resolves to the list of patients
 * @throws an error if the request fails
 */

export const getPatients = async () => {
    try {
        const response = await fetch(`${API_URL}/admin/lista_pacientes`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos de pacientes')
        }
        const data = await response.json()
        // await new Promise(resolve => setTimeout(resolve, 5000))
        // const data = listPatients
        return data
    }
    catch (error) {
        console.error('Error al obtener datos de pacientes:', error)
        throw error
    }
}

/**
 * delete a patient from the system
 * @param patientDPI - the id of the patient to delete
 * @returns a promise that resolves to a message if the deletion is successful
 * @throws an error if the deletion fails
 */

export const deletePatient = async (patientId) => {
    try {
        const response = await fetch(`${API_URL}/admin/eliminar_paciente`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({dpi: patientId}),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || 'Error en la eliminación del paciente.')   
        }
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // const data = {message: 'Paciente eliminado correctamente'}
        return data
    }
    catch (error) {
        console.error('Error en eliminación de paciente:', error)
        throw error
    }
}