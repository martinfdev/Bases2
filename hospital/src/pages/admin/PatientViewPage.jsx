
import { useState, useEffect } from 'react';
import PatientTable from '../../components/admin/PatientTable'
import { getPatients, deletePatient, updatePatient, getAreas } from '../../services/adminServices'
import useAppContext from '../../hooks/useAppContext'
import PatientDeleteModal from '../../components/mod/PatientDeleteModal'
import PatientEditModal from '../../components/mod/PatientEditModal'
import PatientViewModal from '../../components/mod/PatientViewModal'
import Waiting from '../../components/shared/Waiting'

const PatientViewPage = () => {
    const [patients, setPatients] = useState([])
    const [areas, setAreas] = useState([])
    const [search, setSearch] = useState('')
    const [filteredPatients, setFilteredPatients] = useState([])
    const [error, setError] = useState('')
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const { addNotification } = useAppContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true)
            try {
                const data = await getPatients()
                setPatients(data.paciente)
            } catch (error) {
                console.error('Error al obtener datos de pacientes:', error)
                setError(error.message)
            }finally{
                setLoading(false)
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

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const data = await getAreas()
                setAreas(data.paciente)
            } catch (error) {
                console.error('Error al obtener datos de areas:', error)
                setError(error.message)
            }
        }
        fetchAreas()
    }, [])

    const handleDelete = (patient) => {
        setSelectedPatient(patient)
        setIsDeleteOpen(true)
    }

    const handleEdit = (patient) => {
        setSelectedPatient(patient)
        setIsEditOpen(true)
    }

    const handleView = (patient) => {
        setSelectedPatient(patient)
        setIsViewOpen(true)
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

    const handleUpdate = async (patient) => {
        try {
            const updatedPatient = await updatePatient(patient)
            const updatedPatients = patients.map(p => p.dpi === updatedPatient.dpi ? updatedPatient : p)
            setPatients(updatedPatients)
            setFilteredPatients(updatedPatients)
            setIsEditOpen(false)
            addNotification({
                type: 'success',
                message: 'Paciente actualizado correctamente',
            })
        } catch (error) {
            addNotification({
                type: 'error',
                message: 'Error al actualizar paciente',
            })
            console.error('Error al actualizar paciente:', error)
        }
    }

    return (
        <>
            {loading ? (
                <Waiting />
            ) : (
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
                            onEdit={handleEdit}
                            onView={handleView}
                            buttonStatus={false}
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
                    <div>
                        <PatientEditModal
                            isOpen={isEditOpen}
                            onClose={() => setIsEditOpen(false)}
                            patient={selectedPatient}
                            listAreas={areas}
                            onSave={handleUpdate}
                        />
                    </div>
                    <div>
                        <PatientViewModal
                            isOpen={isViewOpen}
                            onClose={() => setIsViewOpen(false)}
                            patient={selectedPatient}
                            listAreas={areas}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default PatientViewPage
