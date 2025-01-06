const API_BASE_URL = import.meta.env.VITE_BASE_NEO4J_URL

/**
 * execute a export data to csv ont he server request
 * @returns a promise that resolves to the export data
 * @throws an error if the request fails
 */

export const exportDataToCSV = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/neo/extract_expediente`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            throw new Error('Error al exportar datos')
        }
        const data = await response.json()
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        // const data = { message: 'Datos exportados correctamente' }
        return data
    } catch (error) {
        console.error('Error al exportar datos:', error)
        throw error
    }
}

/**
 * execute to load data to neo4j
 * @param {File} areaFile the file with the areas data
 * @param {File} patientFile the file with the patients data
 * @returns a promise that resolves to the result of the load operation
 */
export const loadDataToNeo = async (areaFile, patientFile) => {
    const formData = new FormData()
    formData.append('area_csv', areaFile)
    formData.append('paciente_csv', patientFile)
    try {
        const response = await fetch(`${API_BASE_URL}/cargar_datos_neo/cargar_datos_neo4j`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        })
        const result = await response.json()
        if (!response.ok) {
            throw new Error(result.message || 'Error al cargar los datos en Neo4j')
        }
        return result
    } catch (error) {
        console.error('Error al cargar los datos en Neo4j:', error)
        throw error
    }
}