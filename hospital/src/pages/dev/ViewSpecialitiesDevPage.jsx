
import { useEffect, useState } from 'react'
import { getSpecialties } from '../../services/developerService'
import SpecialityTable from '../../components/tables/SpecialityTable'

const ViewSpecialitiesDevPage = () => {
    const [specialities, setSpecialities] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const data = await getSpecialties()
                setSpecialities(data.especialidades)
            } catch (error) {
                console.error('Error al obtener especialidades:', error)
                setError(error.message)
            }
        }
        fetchSpecialities()
    }, [])

    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-blue-800 ">Lista de Especialidades</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <SpecialityTable specialities={specialities} />
        </div>
    )
}

export default ViewSpecialitiesDevPage