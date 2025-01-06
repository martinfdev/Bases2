const API_URL = import.meta.env.VITE_BASE_NURSE_URL

import {listLogs, dashboardDeveloper, listSpecialty, listUsers, 
    listPatients, listAreas, listAttendedPatients, commonDignosis, patientDontAreaAssigned,
    listNurses, listDoctors, lastPatientsIngresed
} from '../test/testData' //this is just for testing purposes in development mode


/**
 * get the list of patients from the server
 * @returns a promise that resolves to the list of patients
 * @throws an error if the request fails
 */

export const getPatients = async () => {
    try {
        const response = await fetch(`${API_URL}/enfermera/lista_pacientes`, {
            method: 'GET',
            headers: {
                 'Content-Type': 'application/json', 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos de pacientes')
        }
        const data = await response.json()
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // const data = listPatients
        return data
    }
    catch (error) {
        console.error('Error al obtener datos de pacientes:', error)
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
        const response = await fetch(`${API_URL}/enfermera/editar_paciente`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || 'Error en la actualización del paciente.')
        }
        // await new Promise(resolve => setTimeout(resolve, 5000))
        // console.log('patientData to send:', patientData)
        // const data = {message: 'Paciente actualizado correctamente'}
        return data
    } catch (error) {
        console.error('Error en actualización de paciente:', error)
        throw error
    }
}

/** 
 * get a list of areas from the server
 * @returns a promise that resolves to the list of areas
 * @throws an error if the request fails
 * 
 */

export const getAreas = async () => {
    try {
        const response = await fetch(`${API_URL}/enfermera/lista_area`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos de áreas')
        }
        const data = await response.json()
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // const data = listAreas
        return data
    } catch (error) {
        console.error('Error al obtener datos de áreas:', error)
        throw error
    }
}

export const assignedPatients = async () => {
    try {
        const response = await fetch(`${API_URL}/enfermera/pacientes_asignados`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos de pacientes asignados')
        }
        const data = await response.json()
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // const data = listPatients
        return data
    } catch (error) {
        console.error('Error al obtener datos de pacientes asignados:', error)
        throw error
    }
}

