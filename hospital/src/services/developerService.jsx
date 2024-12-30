const API_URL = import.meta.env.VITE_BASE_DEV_URL

import {listLogs, dashboardDeveloper} from '../test/testData' //this is just for testing purposes in development mode

/**
 * get dashboard data from the server for the developer user
 * @returns a promise that resolves to the dashboard data
 * @throws an error if the request fails
 */
export async function getDashboardData() {
    try {
        // const response = await fetch(`${API_URL}desarrollador/dashboard`, {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // })
        // if (!response.ok) {
        //     throw new Error('Error al obtener datos del dashboard')
        // }
        // const data = await response.json()
        const data = dashboardDeveloper
        return data
    }
    catch (error) {
        console.error('Error al obtener datos del dashboard:', error)
        throw error
    }
}

/**
 * Get logs from the server
 * @returns a promise that resolves to the logs
 * @throws an error if the request fails
 * @param {*} data 
 */

export async function getLogs() {
    try {
        const response = await fetch(`${API_URL}/desarrollador/logs`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos de logs')
        }
        const logs = await response.json()
        // await new Promise(resolve => setTimeout(resolve, 1000))
        // const logs = listLogs
        return logs
    } catch (error) {
        console.error('Error al obtener datos de logs:', error)
        throw error
    }
}