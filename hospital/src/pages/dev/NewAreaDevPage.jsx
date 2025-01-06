import AreaForm from '../../components/forms/AreaForm'
import useAppContext from '../../hooks/useAppContext'
import { createArea } from '../../services/developerService'


const NewAreaDevPage = () => {
    const { addNotification } = useAppContext()

    const handleSubmit = async (data) => {
        try {
            await createArea(data)
            addNotification({
                type: 'success',
                message: 'Área creada correctamente',
            })
        } catch (error) {
            console.error('Error al crear el área:', error)
            addNotification({
                type: 'error',
                message: 'Error al crear el área',
            })
        }
    }

    return (
        <div className="h-full p-4 bg-slate-50 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Formulario de Área</h1>
            <AreaForm onSubmit={handleSubmit} />
        </div>
    )
}

export default NewAreaDevPage

