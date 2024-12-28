import {useState, useEffect} from 'react'
import PatientForm from '../../components/admin/PatientForm'
import { getAreas } from '../../services/adminServices'
import useAppContext from '../../hooks/useAppContext'


const NewPatientPage = () => {
    const [areas, setAreas] = useState([])
    const [error, setError] = useState('')
    const { addNotification } = useAppContext()

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const data = await getAreas()
                setAreas(data.paciente)
            } catch (error) {
                console.error('Error al obtener especialidades:', error)
                setError(error.message)
                addNotification(
                    {
                        type: 'error',
                        message: 'Error al obtener areas'
                    }
                )
            }
        }
        fetchAreas()
        }, [addNotification])


    return (
        <div>
            <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
                <p className="text-2xl font-semibold">{error}</p>
                <PatientForm listAreas={areas} />
            </div>
        </div>
    )
}

export default NewPatientPage