import { useState, useEffect } from 'react'
import PatientForm from '../../components/forms/PatientForm'
import { getAreas, createPatient } from '../../services/adminServices'
import useAppContext from '../../hooks/useAppContext'
import Waiting from '../../components/shared/Waiting'


const NewPatientPage = () => {
    const [areas, setAreas] = useState([])
    const [error, setError] = useState('')
    const { addNotification } = useAppContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const data = await getAreas()
                setAreas(data.paciente)
                setLoading(false)
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

    const handleCreatePatient = async (formData) => {
        console.log('formData:', formData)
        try {
            setLoading(true)
            await createPatient(formData)
            addNotification({
                type: 'success',
                message: 'Paciente creado correctamente'
            })
        } catch (error) {
            console.error('Error al crear paciente:', error)
            addNotification({
                type: 'error',
                message: 'Error al crear paciente'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? <Waiting /> :
                <div>
                    <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
                        <p className="text-2xl font-semibold">{error}</p>
                        <PatientForm listAreas={areas} createPatient={handleCreatePatient} />
                    </div>
                </div>
            }
        </>
    )
}

export default NewPatientPage