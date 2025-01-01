import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PatientTable from '../../components/tables/PatientTable'
import { getPatients } from '../../services/doctorService'
import { getRecordPatient, updateRecordPatient } from '../../services/mongoServices'
import Waiting from '../../components/shared/Waiting'
import useAppContext from '../../hooks/useAppContext'
import EditRecordForm from '../../components/forms/EditRecordForm'

const PatientEditRecordPage = () => {
    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const [filteredPatients, setFilteredPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [recordPatient, setRecordPatient] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { addNotification } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const fetchPatients = async () => {
            try {
                const data = await getPatients()
                setPatients(data.paciente)
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

    const handleGetRecord = async (dpi) => {
        setLoading(true)
        try {
            const data = await getRecordPatient(dpi)
            setRecordPatient(data.expediente)
            setSelectedPatient(patients.find((p) => p.dpi === dpi))
        } catch (error) {
            console.error('Error al obtener expediente:', error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleFormSubmit = async (formData) => {
        setLoading(true)
        try {
            await updateRecordPatient(formData)
            addNotification({
                type: 'success',
                message: 'Expediente actualizado correctamente.',
            })
            setSelectedPatient(null)
            navigate('/doctor/records/edit')
        } catch (error) {
            console.error('Error al crear paciente ingresado:', error)
            addNotification({
                type: 'error',
                message: 'Error al actualizar expediente.',
            })
        } finally {
            setLoading(false)
        }
    }

    const actions = [
        (patient) => (
            <button
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                onClick={() => {
                    handleGetRecord(patient.dpi)
                }}
            >
                <svg className="w-8 h-8 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 113.828 3.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                </svg>
                Editar Expediente
            </button>
        ),
    ]

    if (loading) return <Waiting />
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            {loading ? (
                <Waiting />
            ) : selectedPatient ? (
                <div className="p-4 bg-white shadow-md rounded">
                    <h2 className="text-2xl font-bold mb-4">Editar Expediente de: {selectedPatient.nombre} {selectedPatient.apellido}</h2>
                    <EditRecordForm
                        onSubmit={handleFormSubmit}
                        expediente={recordPatient}
                        isEditableStatus={true}
                    />
                    <button
                        className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                        onClick={() => setSelectedPatient(null)}
                    >
                        Cancelar
                    </button>
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

export default PatientEditRecordPage
