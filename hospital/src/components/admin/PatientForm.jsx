import { useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../common/Input'
import Select from '../common/Select'
import { createPatient } from '../../services/adminServices'
import useAppContext from '../../hooks/useAppContext'

const PacienteForm = ({ listAreas }) => {
    const { addNotification } = useAppContext()
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dpi: '',
        genero: '',
        fecha_nacimiento: '',
        telefono: '',
        direccion: '',
        id_area: 0,
        estado: '',
    })

    //dpi is a number, so we need therteen digits
    const dpiRegex = /^\d{13}$/

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!dpiRegex.test(formData.dpi)) {
            addNotification({
                type: 'error',
                message: 'El DPI debe contener exactamente 13 dígitos'
            })
            return
        }
        try {
            await createPatient(formData)
            addNotification({
                type: 'success',
                message: 'Paciente creado exitosamente'
            })
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
            id_area: 0,
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
                    <label className="text-gray-700 font-medium mb-1">
                        {"DPI"}
                    </label>
                    <input
                        type="number"
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
                    type="number"
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
                    type="number"
                    name="id_area"
                    value={formData.id_area.stringValue}
                    onChange={handleChange}
                    options={listAreas.map(area => ({ value: area.id_area, label: area.nombre_area }))}
                />
                <Select
                    label="Estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    options={[
                        { value: '', label: 'Selecciona estado' },
                        { value: 1, label: 'Activo' },
                        { value: 0, label: 'Inactivo' },
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
}

export default PacienteForm
