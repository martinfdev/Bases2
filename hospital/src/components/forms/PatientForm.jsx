import { useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../common/Input'
import Select from '../common/Select'
import useAppContext from '../../hooks/useAppContext'

const PacienteForm = ({ listAreas, createPatient }) => {
    const { addNotification } = useAppContext()
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dpi: '',
        genero: '',
        fecha_nacimiento: '',
        telefono: '',
        direccion: '',
        id_area: '',
        estado: '',
    })

    // DPI validation regex
    const dpiRegex = /^\d{13}$/

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!dpiRegex.test(formData.dpi)) {
            addNotification({
                type: 'error',
                message: 'El DPI debe contener exactamente 13 dígitos',
            })
            return
        }

        try {
            const submissionData = {
                ...formData,
                id_area: parseInt(formData.id_area, 10),
                estado: formData.estado ? parseInt(formData.estado, 10) : null,
            }
            await createPatient(submissionData)
            handleReset()
        } catch (error) {
            console.error(error)
        }
    }

    const handleReset = () => {
        setFormData({
            nombre: '',
            apellido: '',
            dpi: '',
            genero: '',
            fecha_nacimiento: '',
            telefono: '',
            direccion: '',
            id_area: '',
            estado: '',
        })
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Formulario de Paciente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Nombre"
                    name="nombre"
                    type="text"
                    required={true}
                    value={formData.nombre}
                    onChange={handleChange}
                />
                <Input
                    label="Apellido"
                    name="apellido"
                    type="text"
                    value={formData.apellido}
                    onChange={handleChange}
                />
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">DPI (13 dígitos)</label>
                    <input
                        type="text"
                        id="dpi"
                        name="dpi"
                        value={formData.dpi}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Select
                    label="Género"
                    name="genero"
                    type='text'
                    value={formData.genero}
                    onChange={handleChange}
                    options={[
                        { value: '', label: 'Selecciona género' },
                        { value: 'Masculino', label: 'Masculino' },
                        { value: 'Femenino', label: 'Femenino' },
                        { value: 'Otro', label: 'Otro' },
                    ]}
                />
                <Input
                    label="Fecha de Nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={handleChange}
                />
                <Input
                    label="Teléfono"
                    name="telefono"
                    type="text"
                    value={formData.telefono}
                    onChange={handleChange}
                />
                <Input
                    label="Dirección"
                    name="direccion"
                    type="text"
                    value={formData.direccion}
                    onChange={handleChange}
                />
                <Select
                    label="Área"
                    name="id_area"
                    type='number'
                    value={formData.id_area}
                    onChange={handleChange}
                    options={listAreas.map(area => ({
                        value: area.id_area.toString(), // Convert to string
                        label: area.nombre_area,
                    }))}
                />
                <Select
                    label="Estado"
                    name="estado"
                    type='text'
                    value={formData.estado}
                    onChange={handleChange}
                    options={[
                        { value: '', label: 'Selecciona estado' },
                        { value: '1', label: 'Activo' },
                        { value: '0', label: 'Inactivo' },
                    ]}
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}

PacienteForm.propTypes = {
    listAreas: PropTypes.arrayOf(
        PropTypes.shape({
            id_area: PropTypes.number.isRequired,
            nombre_area: PropTypes.string.isRequired,
        })
    ).isRequired,
    createPatient: PropTypes.func.isRequired,
}

export default PacienteForm
