const API_URL = import.meta.env.VITE_BASE_ADMIN_URL

import {dashboardAdmin, listSpecialty, listUsers, listPatients, listAreas, listAttendedPatients, commonDignosis, patientDontAreaAssigned,
    listNurses, listDoctors, lastPatientsIngresed
} from '../test/testData' //this is just for testing purposes in development mode

/**
 * get dashboard data from the server for the admin user
 * @returns a promise that resolves to the dashboard data
 * @throws an error if the request fails
 */
export const getDashboardData = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/dashboard`, {
        //     method: 'GET', 
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos del dashboard')
        // }
        // const data = await response.json()
        const data = dashboardAdmin
        return data
    } catch (error) {
        console.error('Error al obtener datos del dashboard:', error)
        throw error
    }
}

/**
 * Register a new user in the system
 * @param userData - object containing the user data
 * @returns a promise that resolves to the user data if the registration is successful
 * @throws an error if the registration fails
 */
export async function registerUser(userData) {
    try {
        //   const response = await fetch(`${API_URL}/admin/register`, {
        //     method: 'POST',
        //     headers: {
        //        Authorization: `Bearer ${localStorage.getItem('token')}`,
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userData),
        //   })
  
        //   const data = await response.json()
  
        //   if (!response.ok) {
        //     throw new Error(data.error || 'Error en el registro del usuario.')
        //   }
          await new Promise(resolve => setTimeout(resolve, 1000))
          console.log('userData to send:', userData)
      } catch (error) {
          console.error('Error en registro de usuario:', error)
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
        // const response = await fetch(`${API_URL}/admin/obtener_especialidades`, {
        //     method: 'GET', 
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de especialidades')
        // }
        // const data = await response.json()
        const data = listSpecialty
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
        // const response = await fetch(`${API_URL}/admin/insertar_especialidad`, {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(specialtyData),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en la creación de la especialidad.')
        // }
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
        // const response = await fetch(`${API_URL}/admin/lista_usuarios`, {
        //     method: 'GET', 
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de usuarios')
        // }
        // const data = await response.json()
        const data = listUsers
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
        // const response = await fetch(`${API_URL}/admin/consulta_usuario`, {
        //     method: 'GET', 
        //     headers: {
        //         'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        //     body: JSON.stringify({dpi: userId}),
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos del usuario')
        // }
        // const data = await response.json()
        const data = listUsers.find(u => u.id === userId)
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
        // const response = await fetch(`${API_URL}/admin/eliminacion_usuario`, {
        //     method: 'DELETE', 
        //     headers: {
        //         'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        //     body: JSON.stringify({dpi: userId}),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en la eliminación del usuario.')
        // }
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = {message: 'Usuario eliminado correctamente'}
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
        // const response = await fetch(`${API_URL}/admin/actualizar_usuario`, {
        //     method: 'PUT',
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userData),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.Error || 'Error en la actualización del usuario.')
        // }
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('userData to send:', userData)
        const data = {message: 'Usuario actualizado correctamente'}
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
        // const response = await fetch(`${API_URL}/admin/crear_paciente`, {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(patientData),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en la creación del paciente.')
        // }
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('patientData to send:', patientData)
        const data = {message: 'Paciente creado correctamente'}
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
        // const response = await fetch(`${API_URL}/admin/lista_pacientes`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de pacientes')
        // }
        // const data = await response.json()
        await new Promise(resolve => setTimeout(resolve, 500))
        const data = listPatients
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
        // console.log(patientId)
        // const response = await fetch(`${API_URL}/admin/eliminar_paciente`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        //     body: JSON.stringify({dpi: patientId}),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en la eliminación del paciente.')   
        // }
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = {message: 'Paciente eliminado correctamente'}
        console.log('patientData to send:', patientId)
        return data
    }
    catch (error) {
        console.error('Error en eliminación de paciente:', error)
        throw error
    }
}

/**
 * update the patient data in the system
 * @param patientData - object containing the patient data
 * @returns a promise that resolves to the updated patient data if the update is successful
 **/

export const updatePatient = async (patientData) => {
    try {
        // const response = await fetch(`${API_URL}/admin/editar_paciente`, {
        //     method: 'PUT',
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(patientData),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en la actualización del paciente.')
        // }
        await new Promise(resolve => setTimeout(resolve, 5000))
        console.log('patientData to send:', patientData)
        const data = {message: 'Paciente actualizado correctamente'}
        return data
    } catch (error) {
        console.error('Error en actualización de paciente:', error)
        throw error
    }
}

/*
 * get a patient data from the server
 * @param patientDPI - the id of the patient to get
 * @returns a promise that resolves to the patient data
 * @throws an error if the request fails
 */

export const getPatient = async (patientDPI) => {
    try {
        // const response = await fetch(`${API_URL}/admin/consulta_paciente`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        //     body: JSON.stringify({dpi: patientDPI}),
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos del paciente')
        // }
        // const data = await response.json()
        const data = listPatients.find(p => p.dpi === patientDPI)
        console.log('data to send:', data)
        return data
        } catch (error) {
        console.error('Error al obtener datos del paciente:', error)
        throw error
    }
}


/** 
 * create a new area in the system 
 * @param areaData - object containing the area data
 * @returns a promise that resolves to the area data if the creation is successful
 * @throws an error if the creation fails
 */

export const createArea = async (areaData) => { 
    try {
        const response = await fetch(`${API_URL}/admin/insertar_area`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(areaData),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || 'Error Area ya existe.')
        }
        console.log('areaData to send:', areaData)
        // const data = {message: 'Área creada correctamente'}
        return data
    } catch (error) {
        console.error('Error en creación de área:', error)
        throw error
    }
}

/**
 * get the list of areas from the server
 * @returns a promise that resolves to the list of areas
 * @throws an error if the request fails
 */
export const getAreas = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/lista_area`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de áreas')
        // }
        // const data = await response.json()
        const data = listAreas
        return data
    } catch (error) {
        console.error('Error al obtener datos de áreas:', error)
        throw error
    }
}

/**
 * delete an area from the system
 * @param areaId - the id of the area to delete
 * @returns a promise that resolves to a message if the deletion is successful
 * @throws an error if the deletion fails
 */

export const deleteArea = async (nombreArea) => {
    try {
        // const response = await fetch(`${API_URL}/admin/eliminar_area`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        //     body: JSON.stringify({nombre_area: nombreArea}),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en la eliminación del área.')
        // }
        await new Promise(resolve => setTimeout(resolve, 5000))
        console.log('areaData to send:', nombreArea)
        const data = {message: 'Área eliminada correctamente'}
        return data
    } catch (error) {
        console.error('Error en eliminación de área:', error)
        throw error
    }
}

/**
 * update the area data in the system
 * @param areaData - object containing the area data
 * @returns a promise that resolves to the updated area data if the update is successful
 * @throws an error if the update fails
 */

export const updateArea = async (areaData) => {
    try {
        // const response = await fetch(`${API_URL}/admin/actualizar_area`, {
        //     method: 'PUT',
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(areaData),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en la actualización del área.')
        // }
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('areaData to send:', areaData)
        const data = {message: 'Área actualizada correctamente'}
        return data
    }
    catch (error) {
        console.error('Error en actualización de área:', error)
        throw error
    }
}

/** 
 * get a area data from the server
 * @param areaName - the id of the area to get
 * @returns a promise that resolves to the area data
 * @throws an error if the request fails
 */

const getArea = async (areaName) => {
    try {
        // const response = await fetch(`${API_URL}/admin/consultar_area`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        //     body: JSON.stringify({nombre_area: areaName}),
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos del área')
        // }
        // const data = await response.json()
        const data = listAreas.find(a => a.nombre_area === areaName)
        return data
    } catch (error) {
        console.error('Error al obtener datos del área:', error)
        throw error
    }
}

/**
 * get the list of attended patients from the server
 * @returns a promise that resolves to the list of attended patients
 * @throws an error if the request fails
 */
export const getAttendedPatients = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/pacientes_atendidos`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de pacientes atendidos')
        // }
        // const data = await response.json()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = listAttendedPatients
        return data
    } catch (error) {
        console.error('Error al obtener datos de pacientes atendidos:', error)
        throw error
    }
}

/**
 * get the list of common diagnosis from the server
 * @returns a promise that resolves to the list of attended patients
 * @throws an error if the request fails
 */
export const getCommonDiagnosis = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/obtener-diagnosticos-comunes`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de diagnósticos comunes')
        // }
        // const data = await response.json()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = commonDignosis
        return data
    }
    catch (error) {
        console.error('Error al obtener datos de diagnósticos comunes:', error)
        throw error
    }
}

/**
 * get list of patients dont have area assigned
 * @returns a promise that resolves to the list of patients
 * @throws an error if the request fails
 * */

export const getPatientsDontHaveArea = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/pacientes_sin_area_asignada`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de pacientes sin área asignada')
        // }
        // const data = await response.json()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = patientDontAreaAssigned
        return data
    } catch (error) {
        console.error('Error al obtener datos de pacientes sin área asignada:', error)
        throw error
    }
}

/**
 * report Area download pdf file from the server
 * @returns a promise that resolves to the list of attended patients
 * @throws an error if the request fails
 */

export const downloadReportArea = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/descargarPDF_area`, {
        const response = await fetch(`https://run.mocky.io/v3/2cc4f894-9b5d-4c74-8de0-5c228f71e928`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al descargar reporte de area')
        }
        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = 'reporte_area.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('Descargando reporte de area')
    } catch (error) {
        console.error('Error al descargar reporte de area:', error)
        throw error
    }
}

/**
 * report Patients download pdf file from the server
 * @returns a promise that resolves to the list of attended patients
 * @throws an error if the request fails
 */
export const downloadReportPatients = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/descargar_reporte_pacientes`, {
        const response = await fetch(`https://run.mocky.io/v3/2cc4f894-9b5d-4c74-8de0-5c228f71e928`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al descargar reporte de pacientes')
        }
        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = 'reporte_pacientes.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('Descargando reporte de pacientes')
    } catch (error) {
        console.error('Error al descargar reporte de pacientes:', error)
        throw error
    }
}

/**
 * report Diagnosis download pdf file from the server
 * @returns a promise that resolves to the list of attended patients
 * @throws an error if the request fails
 */

export const downloadReportDiagnosis = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/descargar_reporte_diagnosticos`, {
        const response = await fetch(`https://run.mocky.io/v3/2cc4f894-9b5d-4c74-8de0-5c228f71e928`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al descargar reporte de diagnósticos')
        }
        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = 'reporte_diagnosticos.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('Descargando reporte de diagnósticos')
    } catch (error) {
        console.error('Error al descargar reporte de diagnósticos:', error)
        throw error
    }
}

/**
 * report Area download excel file from the server
 * @returns a promise that resolves to the list of attended patients
 * @throws an error if the request fails
 */

export const downloadReportAreaExcel = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/downloadReportAreaExcel`, {
        const response = await fetch(`https://run.mocky.io/v3/2cc4f894-9b5d-4c74-8de0-5c228f71e928`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al descargar reporte de area')
        }
        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = 'reporte_area.xlsx'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('Descargando reporte de area')
    } catch (error) {
        console.error('Error al descargar reporte de area:', error)
        throw error
    }
}

/**
 * report Patients download excel file from the server
 * @returns a promise that resolves to the list of attended patients
 * @throws an error if the request fails
 */
export const downloadReportPatientsExcel = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/descargar_reporte_pacientes_excel`, {
        const response = await fetch(`https://run.mocky.io/v3/2cc4f894-9b5d-4c74-8de0-5c228f71e928`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al descargar reporte de pacientes')
        }
        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = 'reporte_pacientes.xlsx'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('Descargando reporte de pacientes')
    } catch (error) {
        console.error('Error al descargar reporte de pacientes:', error)
        throw error
    }
}

/**
 * report Diagnosis download excel file from the server
 * @returns a promise that resolves to the list of attended patients
 * @throws an error if the request fails
 */
export const downloadReportDiagnosisExcel = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/descargar_reporte_diagnosticos_excel`, {
        const response = await fetch(`https://run.mocky.io/v3/2cc4f894-9b5d-4c74-8de0-5c228f71e928`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al descargar reporte de diagnósticos')
        }
        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = 'reporte_diagnosticos.xlsx'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('Descargando reporte de diagnósticos')
    } catch (error) {
        console.error('Error al descargar reporte de diagnósticos:', error)
        throw error
    }
}

/**
 * get the list of nurses from the server
 * @returns a promise that resolves to the list of nurses
 * @throws an error if the request fails
 */

export const getNurses = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/enfermeras`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de enfermeras')
        // }
        // const data = await response.json()
        const data = listNurses
        await new Promise(resolve => setTimeout(resolve, 1000))
        return data
    } catch (error) {
        console.error('Error al obtener datos de enfermeras:', error)
        throw error
    }
}

/**
 * get the list of doctors from the server
 * @returns a promise that resolves to the list of doctors
 * @throws an error if the request fails
 */
export const getDoctors = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/doctores`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de doctores')
        // }
        // const data = await response.json()
        const data = listDoctors
        await new Promise(resolve => setTimeout(resolve, 1000)) 
        return data
    } catch (error) {
        console.error('Error al obtener datos de doctores:', error)
        throw error
    }
}

/**
 * assign patinet to area, doctor and nurse
 * @param dataToSend - object containing the patient data
 * @returns a promise that resolves to the updated patient data if the update is successful
 * @throws an error if the update fails
 */

export const assignPatient = async (dataToSend) => {
    try {
        // const response = await fetch(`${API_URL}/admin/agregar_paciente_area`, {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(dataToSend),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en la asignación del paciente.')
        // }
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('dataToSend to send:', dataToSend)
        const data = {message: 'Paciente asignado correctamente'}
        return data
    } catch (error) {
        console.error('Error en asignación de paciente:', error)
        throw error
    }
}

/**
 * get the list of patients last ingresed from the server
 * @returns a promise that resolves to the list of patients
 * @throws an error if the request fails
 */

export const getPatientsLastIngresed = async () => {
    try {
        // const response = await fetch(`${API_URL}/admin/ultimos_pacientes_ingresados`, {
        //     method: 'GET',
        //     headers: {
        //          'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de pacientes ingresados')
        // }
        // const data = await response.json()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = lastPatientsIngresed
        return data
    } catch (error) {
        console.error('Error al obtener datos de pacientes ingresados:', error)
        throw error
    }
}

