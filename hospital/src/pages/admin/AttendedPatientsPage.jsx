import {useState, useEffect} from 'react'
import AttendedPatientTable from '../../components/tables/AttendedPatientTable'
import { getAttendedPatients } from '../../services/adminServices'
import useAppContext from '../../hooks/useAppContext'
import Waiting from '../../components/shared/Waiting'

const AttendedPatientsPage = () => {
    const [attendedPatients, setAttendedPatients] = useState([])
    const [error, setError] = useState('')
    const { addNotification } = useAppContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAttendedPatients = async () => {
            setLoading(true)
            try {
                const data = await getAttendedPatients()
                setAttendedPatients(data)
            } catch (error) {
                console.error('Error al obtener lista de pacientes atendidos:', error)
                setError(error.message)
                addNotification(
                    {
                        type: 'error',
                        message: 'Error al obtener lista de pacientes atendidos'
                    }
                )
            }finally {
                setLoading(false)
            }
        }
        fetchAttendedPatients()
        }, [addNotification])

    return (
        (loading) ? <Waiting /> :
        <div>
            <div className="w-full max-w-full mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
                <p className="text-2xl font-semibold">{error}</p>
                <h1 className="text-2xl font-semibold text-center mt-4 p-4 hover:bg-slate-100">Lista de Pacientes Atendidos</h1>
                <AttendedPatientTable listAttendedPatients={attendedPatients} />
            </div>
        </div>
        )
}

export default AttendedPatientsPage