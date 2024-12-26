import { useEffect, useState } from 'react'
import { getAreas, deleteArea, updateArea } from '../../services/adminServices'
import AreaTable from '../../components/tables/AreaTable'
import DeleteModalArea from '../../components/mod/DeleteModalArea'
import useAppContext from '../../hooks/useAppContext'

const ViewAreasPage = () => {
    const [areas, setAreas] = useState([])
    const [error, setError] = useState('')
    const [filteredAreas, setFilteredAreas] = useState([])
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedArea, setSelectedArea] = useState(null)
    const [ search, setSearch ] = useState('')
    const { addNotification } = useAppContext()
 
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

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredAreas(areas)
        } else {
            setFilteredAreas(areas.filter(a => a.nombre_area.toLowerCase().includes(search)))
        }
    }, [search, areas])



    const handleDelete = async (id) => {
        setIsDeleteOpen(true)
        setSelectedArea(areas.find(a => a.id_area === id))
    }

    const handleDeteArea = async (area) => {
        try {
            await deleteArea(area.nombre_area)
            setAreas(areas.filter(a => a.id_area !== area.id_area))
            setIsDeleteOpen(false)
            addNotification(
                {
                    type: 'success',
                    message: 'Area eliminada correctamente'
                }
            )
            setSelectedArea(null)
        } catch (error) {
            console.error('Error al eliminar area:', error)
            setError(error.message)
        }
    }

    const handleEdit = async (id) => {
        setIsEditOpen(true)
        setSelectedArea(areas.find(a => a.id_area === id))
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-wide text-center mt-6 mb-2 text-blue-800 ">Areas</h1>
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
                    onEdit={handleEdit}
                    onDelete={handleDelete} />
            </div>
            <div className="flex justify-center">
                <DeleteModalArea
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleDeteArea}
                    area={selectedArea}
                />
            </div>
        </div>
    )
}

export default ViewAreasPage