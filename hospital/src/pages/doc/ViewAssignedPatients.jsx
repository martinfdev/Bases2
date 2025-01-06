import { useState, useEffect } from 'react'
import PatientTable from '../../components/tables/PatientTable'
import {getPatientsAssigned, getReportByPatientPdf } from '../../services/doctorService'
import Waiting from '../../components/shared/Waiting'

const ViewAssignedPatients = () => {
    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const [filteredPatients, setFilteredPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        const fetchPatients = async () => {
            try {
                const data = await getPatientsAssigned()
                setPatients(data.paciente)
                console.log('data:', data)
            } catch (error) {
                console.error('Error al obtener pacientes:', error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPatients()
    }, [])

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredPatients(patients)
        } else {
            setFilteredPatients(patients.filter((p) => p.dpi.includes(search)))
        }
    }, [search, patients])

    const handleReport = async (idPatient) => {
        setLoading(true)
        try {
            await getReportByPatientPdf(idPatient)
        } catch (error) {
            console.error('Error al obtener reporte:', error)
            setError(error)
        }finally {
            setLoading(false)
        }
    }

    const actions = [
        (patient) => (
            <button
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                onClick={() => {
                    setSelectedPatient(patient)
                }}
            >
                <svg className="w-8 h-8 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14c4 0 6 2 6 4v2M8 20v-2c0-2 2-4 6-4M12 12a4 4 0 100-8 4 4 0 000 8z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21l2 2 4-4"/></svg>
                Dar De Alta
            </button>
        ),
        (patient) => (
            <button
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleReport(patient.id)}
            >
                <svg className="w-8 h-8 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a6 6 0 00-6 6"/></svg>
                Reporte
            </button>
        )
    ]

    if (loading) return <Waiting />
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            {loading ? (
                <Waiting />
            ) : selectedPatient ? (
                <div className="flex flex-col p-6 bg-white shadow-md rounded space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Dar de alta paciente: {selectedPatient.nombre} {selectedPatient.apellido}
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
              
            ) : (
                <div>
                    <div className="mb-4 flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Buscar por DPI..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Lista de pacientes</h1>
                    <PatientTable patients={filteredPatients} actions={actions} />
                </div>
            )}
        </div>
    )
}

export default ViewAssignedPatients
