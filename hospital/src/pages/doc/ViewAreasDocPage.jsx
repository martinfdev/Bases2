import { useEffect, useState } from 'react'
import { getAreas } from '../../services/doctorService'
import AreaTable from '../../components/tables/AreaTable'
import ViewModalArea from '../../components/mod/ViewModalArea'
import Waiting from '../../components/shared/Waiting'

const ViewAreasDocPage = () => {
    const [areas, setAreas] = useState([])
    const [error, setError] = useState('')
    const [filteredAreas, setFilteredAreas] = useState([])
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [selectedArea, setSelectedArea] = useState(null)
    const [ search, setSearch ] = useState('')
    const [loading, setLoading] = useState(true)
 
    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const data = await getAreas()
                setAreas(data.paciente)
            } catch (error) {
                console.error('Error al obtener especialidades:', error)
                setError(error.message)
            }finally{
                setLoading(false)
            }
        }
        fetchAreas()
    }, [])

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredAreas(areas)
        } else {
            setFilteredAreas(areas.filter(a => a.nombre_area.toLowerCase().includes(search)))
        }
    }, [search, areas])

    const handleView = async (area) => {
        setSelectedArea(area)
        setIsViewOpen(true)
    }
   
    return (
        <>
        {loading && <Waiting />}
        {!loading && error && <div className="alert alert-danger">{error}</div>}
        <div>
            <h1 className="text-3xl font-semibold tracking-wide text-center mt-6 mb-2 text-blue-800 ">Areas Hospitalarias</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <div className="mb-4 flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Buscar por por Nombre..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className='mb-4 flex items-center space-x-2'>
                <AreaTable
                    areas={filteredAreas}
                    onEdit={()=>{}}
                    onDelete={()=>{}} 
                    onView={handleView}
                />
            </div>    
            <div className="flex justify-center">
                <ViewModalArea
                    isOpen={isViewOpen}
                    onClose={() => setIsViewOpen(false)}
                    area={selectedArea}
                />
            </div>
        </div>
        </>
      
    )
}

export default ViewAreasDocPage