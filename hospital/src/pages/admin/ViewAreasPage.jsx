import { useEffect, useState } from 'react'
import { getAreas } from '../../services/adminServices'
import AreaTable from '../../components/tables/AreaTable'

const ViewAreasPage = () => {
    const [areas, setAreas] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const data = await getAreas()
                setAreas(data.paciente)
            } catch (error) {
                console.error('Error al obtener especialidades:', error)
                setError(error.message)
            }
        }
        fetchAreas()
    }, [])

    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-blue-800 ">Lista de Especialidades</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <AreaTable areas={areas} />
        </div>
    )
}

export default ViewAreasPage