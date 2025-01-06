import { useState, useEffect } from 'react'
import useAppContext from '../../hooks/useAppContext'
import Waiting from '../../components/shared/Waiting'
import AssigmentTable from '../../components/tables/AssigmentTable'
import AssigmentFormModal from '../../components/forms/AssigmentFormModal'
import { getPatientsDontHaveArea, getDoctors, getNurses, assignPatient, getAreas } from '../../services/developerService'

const PatientsDontHaveAreaDev = () => {
    const { addNotification } = useAppContext()
    const [patients, setPatients] = useState([])
    const [areas, setAreas] = useState([])
    const [doctors, setDoctors] = useState([])
    const [nurses, setNurses] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await getPatientsDontHaveArea()
                setPatients(response.pacientes_sin_area)

                const areasResponse = await getAreas()
                setAreas(areasResponse.paciente) 

                const doctorsResponse = await getDoctors()
                setDoctors(doctorsResponse.doctores)

                const nursesResponse = await getNurses()
                setNurses(nursesResponse.enfermeras)

            } catch (error) {
                console.error(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [addNotification])

    const handleAssigment = (patient) => {
        setSelectedPatient(patient)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedPatient(null)
    }

    const handleSave = async (dataToSend) => {
        try {
            await assignPatient(dataToSend)
            addNotification({
                type: 'success',
                message: 'Paciente asignado correctamente'
            })
            const response = await getPatientsDontHaveArea()
            setPatients(response.pacientes_sin_area)
        } catch (error) {
            console.error(error)
            addNotification({
                type: 'error',
                message: error.message
            })
        }
    }

    return (
        loading ? (
            <Waiting />
        ) : (
            <div>
                {error && <p className="text-2xl font-semibold text-red-500">{error}</p>}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Pacientes sin área, doctor y enfermera
                </h1>

                <AssigmentTable
                    patients={patients}
                    onAssigment={handleAssigment}
                />

                <AssigmentFormModal
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    patient={selectedPatient}
                    areas={areas}
                    doctors={doctors}
                    nurses={nurses}
                    onSave={handleSave}
                />
            </div>
        )
    )
}

export default PatientsDontHaveAreaDev