
import {useState, useEffect} from 'react'
import CommonDiagnosisTable from '../../components/tables/CommonDiagnosisTable'
import { getCommonDiagnosis } from '../../services/adminServices'
import useAppContext from '../../hooks/useAppContext'
import Waiting from '../../components/shared/Waiting'

const CommonDiagnosisPage = () => {
    const [commonDiagnosis, setCommonDiagnosis] = useState([])
    const [error, setError] = useState('')
    const { addNotification } = useAppContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAttendedPatients = async () => {
            setLoading(true)
            try {
                const data = await getCommonDiagnosis()
                setCommonDiagnosis(data)
            } catch (error) {
                console.error('Error al obtener lista de diagnosticos comunes:', error)
                setError(error.message)
                addNotification(
                    {
                        type: 'error',
                        message: 'Error al obtener lista de  diagnosticos comunes'
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
                <h1 className="text-2xl font-semibold text-center mt-4 p-4 hover:bg-slate-100">Diagnosticos Comunes</h1>
                <CommonDiagnosisTable listCommonDiagnosis={commonDiagnosis} />
            </div>
        </div>
        )
}

export default CommonDiagnosisPage