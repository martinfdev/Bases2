
import { useState, useEffect } from 'react';
import PatientTable from '../../components/admin/PatientTable'
import { getPatients, deletePatient } from '../../services/adminServices'
import useAppContext from '../../hooks/useAppContext'
import  PatientDeleteModal  from '../../components/mod/PatientDeleteModal'

const PatientView = () => {
    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const [filteredPatients, setFilteredPatients] = useState([])
    const [error, setError] = useState('')
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const { addNotification } = useAppContext()

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await getPatients()
                setPatients(data.paciente)
            } catch (error) {
                console.error('Error al obtener datos de pacientes:', error)
                setError(error.message)
            }
        }
        fetchPatients()
    }, [])

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredPatients(patients)
        } else {
            setFilteredPatients(patients.filter(p => p.dpi.includes(search)))
        }
    }, [search, patients])

    const handleDelete = (patient) => {
        setSelectedPatient(patient)
        setIsDeleteOpen(true)
    }


    const handleConfirmDelete = async (patient) => {
        try {
            const remainingPatients = patients.filter(p => p.dpi !== patient.dpi)
            setPatients(remainingPatients)
            setFilteredPatients(remainingPatients)
            setIsDeleteOpen(false)

            await deletePatient(patient.dpi)
            addNotification({
                type: 'success',
                message: 'Paciente eliminado correctamente',
            })
        } catch (error) {
            addNotification({
                type: 'error',
                message: 'Error al eliminar paciente',
            })
            console.error('Error al eliminar paciente:', error)
        } 
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Listado de Pacientes</h1>
            <div className="mb-4 flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Buscar por DPI..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="overflow-auto">
                <PatientTable
                    patients={filteredPatients}
                    onDelete={handleDelete}
                />
            </div>
            <div className="flex justify-center">
                <PatientDeleteModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleConfirmDelete}
                    patient={selectedPatient}
                />
            </div>
        </div>
    )
}

export default PatientView
