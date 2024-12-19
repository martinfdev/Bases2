import { useState } from 'react'
import Input from '../common/Input'
import Select from '../common/Select'
import { createPatient } from '../../services/adminServices'

const PacienteForm = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createPatient(formData)
            alert('Paciente creado exitosamente')
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
                <Input
                    label="DPI"
                    name="dpi"
                    type="text"
                    value={formData.dpi}
                    onChange={handleChange}
                />
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
                <Input
                    label="ID Área"
                    name="id_area"
                    type="number"
                    value={formData.id_area}
                    onChange={handleChange}
                />
                <Select
                    label="Estado"
                    name="estado"
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
export default PacienteForm
