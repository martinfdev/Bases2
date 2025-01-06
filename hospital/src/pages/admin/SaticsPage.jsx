import {useState, useEffect} from 'react'
import DiagnosticsChart from "../../components/admin/DiagnosticsChart"
import { getCommonDiagnosis } from "../../services/adminServices"
import Waiting from "../../components/shared/Waiting"

const StaticsPage = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCommonDiagnosis = async () => {
            setLoading(true)
            try {
                const data = await getCommonDiagnosis()
                setData(data)
                console.log(data)
            } catch (error) {
                console.error('Error al obtener lista de diagnosticos comunes:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCommonDiagnosis()
    }, [])
    
    return (
        (loading) ? <Waiting /> :
        <div>
            <p className="text-2xl text-red-500 font-semibold">{error}</p>
            <DiagnosticsChart data={data} />
        </div>
    )
}

export default StaticsPage