import { useState, useEffect } from 'react'
import { getPatientsDontHaveArea } from '../../services/adminServices'
import useAppContext from '../../hooks/useAppContext'
import Waiting from '../../components/shared/Waiting'
import PatientTable from '../../components/admin/PatientTable'

const PatientDontAreaAsign = () => {
    const { addNotification } = useAppContext()
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true)
            try {
                const response = await getPatientsDontHaveArea()
                setPatients(response.pacientes_sin_area)

            } catch (error) {
               console.error(error)
            }finally {
                setLoading(false)
            }
        }
        fetchPatients()
    }, [addNotification])

    return (
        loading ? (
            <Waiting />
        ) : (
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Pacientes sin área asignada</h1>
                <PatientTable patients={patients} onDelete={()=>{}} onEdit={()=>{}} onView={()=>{}} buttonStatus={true} />
            </div>
        )
    )
}

export default PatientDontAreaAsign