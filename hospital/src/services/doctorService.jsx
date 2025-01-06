const API_URL = import.meta.env.VITE_BASE_DOCTOR_URL

import { listPatients, listAreas, expireCollegiate, listPatientByDoctor } from '../test/testData'


export const getPatients = async () => {
    try {
        // const response = await fetch(`${API_URL}/desarrollador/lista_pacientes`, {
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
 * get a list of areas
 * @returns a promise that resolves to the list of areas
 * @throws an error if the request fails
 */

export const getAreas = async () => {
    try {
        // const response = await fetch(`${API_URL}/doctor/lista_area`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de áreas')
        // }
        // const data = await response.json()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = listAreas
        return data
    } catch (error) {
        console.error('Error al obtener datos de áreas:', error)
        throw error
    }
}

/**
 * discharge a patient from an area
 * @param {string} idPatient the patient's id
 * @returns a promise that resolves to a message
 * @throws an error if the request fails
 */

export const dischargePatient = async (idPatient) => {
    try {
        // const response = await fetch(`${API_URL}doctor/DarDeAlta/${idPatient}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        //     body: JSON.stringify({ dpi: dpiPatient }),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error al dar de alta paciente.')
        // }
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = { "message": "Paciente dado de alta correctamente." }
        console.log('idPatient:', idPatient)
        return data
    } catch (error) {
        console.error('Error al dar de alta paciente:', error)
        throw error
    }
}

/**
 * get a list of patients asigned by a doctor
 * @returns a promise that resolves to the list of patients
 * @throws an error if the request fails
 */

export const getPatientsAssigned = async () => {
    try {
        // const response = await fetch(`${API_URL}/doctor/pacientes_asignados`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos de pacientes asignados')
        // }
        // const data = await response.json()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = listPatientByDoctor
        return data
    } catch (error) {
        console.error('Error al obtener datos de pacientes asignados:', error)
        throw error
    }
}

/** 
 * generate a report of a patient
 * @orams {string} dpi the patient's id
 * @returns a promise that resolves to the patient's report
 * @throws an error if the request fails
 */

export const getReportByPatientPdf = async (id) => {
    try {
            const response = await fetch(`${API_URL}/generarReporteDoctor/${id}`, {
            // const response = await fetch(`https://run.mocky.io/v3/36de01e0-4c6c-4780-962a-9dc847565722`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al descargar reporte de diagnósticos')
        }
        console.log("patient report", id)   
        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = `reporte_paciente${id}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('Descargando reporte de diagnósticos')
        return { message: `Reporte de paciente ${id} descargado correctamente.` }
    } catch (error) {
        console.error('Error al descargar reporte de diagnósticos:', error)
        throw error
    }
}

/** 
 * get expire of register for doctor
 * @returns a promise that resolves to the list of patients
 * @throws an error if the request fails
 */

export const getExpireCollegiate = async () => {
    try {
        // const response = await fetch(`${API_URL}/doctor/validar_vencimiento_colegiado`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     },
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error al obtener expiración de registro.')
        // }
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = expireCollegiate
        return data
    } catch (error) {
        console.error('Error al obtener expiración de registro:', error)
        throw error
    }
}

