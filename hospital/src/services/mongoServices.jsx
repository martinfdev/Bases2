const API_URL_MONGO = import.meta.env.VITE_API_URL

import {  } from '../test/testData' //this is just for testing purposes in development mode

/**
 * create a new record for a patient
 * @param recordData - object containing the record data
 * @returns a promise that resolves to the record data if the creation is successful
 * @throws an error if the creation fails
 */
export async function createRecordPatient(recordData) {
    try {
        console.log(recordData)
        const response = await fetch(`${API_URL_MONGO}/mongo/crear_expediente`, {
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