const API_BASE_URL = import.meta.env.VITE_BASE_MONGODB_URL

// import {  getDataRecordPatient} from '../test/testData' //this is just for testing purposes in development mode

/**
 * create a new record for a patient
 * @param recordData - object containing the record data
 * @returns a promise that resolves to the record data if the creation is successful
 * @throws an error if the creation fails
 */
export const createRecordPatient =  async (recordData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/mongo/crear_expediente`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recordData),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || 'Error en la creación del registro.')
        }
        return data
    } catch (error) {
        console.error('Error en creación de registro:', error)
        throw error
    }
}

/** create new note for a patient
 * @param noteData - object containing the note data
 * @returns a promise that resolves to the note data if the creation is successful
 * @throws an error if the creation fails
 */
export const createNote = async (noteData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/mongo/agregar_notasCuidado`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Error en la creación de la nota.')
        }
        // await new Promise(resolve => setTimeout(resolve, 5000))
        // const data = {"message": "Expediente del paciente con DPI 9777578880222 actualizado correctamente."}
        // console.log('noteData to send:', noteData)
        return data
    } catch (error) {
        console.error('Error en creación de nota:', error)
        throw error
    }
}

/**
 * new ingresed patient
 * @param patientData - object containing the patient data
 * @returns a promise that resolves to the patient data if the creation is successful
 * @throws an error if the creation fails
 */

export const createPatientIngresed = async (patientDataIngresed) => {
    try {
        const response = await fetch(`${API_BASE_URL}/mongo/crear_paciente`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientDataIngresed),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Error en la creación del paciente.')
        }
        // await new Promise(resolve => setTimeout(resolve, 5000))
        // const data = {"message": "Paciente creado correctamente"}
        // console.log('patientData to send:', patientDataIngresed)
        return data
    } catch (error) {
        console.error('Error en creación de paciente:', error)
        throw error
    }
}

/**
 * get a expediet for patient
 * @returns a promise that resolves to the list of patients
 * @throws an error if the request fails
 */

export const getRecordPatient = async (dpiPatient) => {
    try {
        const response = await fetch(`${API_BASE_URL}/mongo/obtener_expediente`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dpi: dpiPatient }),
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener expediente.')
        }
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // const data = getDataRecordPatient
        // console.log('data:', dpiPatient)
        return data
    } catch (error) {
        console.error('Error al obtener expediente:', error)
        throw error
    }
}

export const updateRecordPatient = async (recordData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/mongo/modificar_expediente`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recordData),
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Error al actualizar expediente.')
        }
        // await new Promise(resolve => setTimeout(resolve, 5000))
        // const data = {"message": "Expediente actualizado correctamente."}
        // console.log('recordData to send:', recordData)
        return data
    } catch (error) {
        console.error('Error al actualizar expediente:', error)
        throw error
    }
}

/**
 * create a backup for system
 * @returns a promise that resolves to the list of patients
 * @throws an error if the request fails
 */

export const createBackup = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/mongo/crear_backups`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Error al crear backup.')
        }
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // const data = { "message": "Backup creado correctamente." }
        return data
    } catch (error) {
        console.error('Error al crear backup:', error)
        throw error
    }
}