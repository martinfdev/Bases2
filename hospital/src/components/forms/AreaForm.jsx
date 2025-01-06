import { useState } from 'react'
import PropTypes from 'prop-types'

const AreaForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        nombre_area: '',
        capacidad: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: name === 'capacidad' ? parseInt(value, 10) || '' : value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await onSubmit(form)
            clearForm()
        } catch (error) {
            console.error('Error al guardar el área:', error)
        }
    }

    const clearForm = () => {
        setForm({
            nombre_area: '',
            capacidad: '',
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border bg-slate-50 rounded shadow-md">
            <div>
                <label htmlFor="nombre_area" className="block text-gray-700 font-medium">Nombre del Área:</label>
                <input
                    type="text"
                    id="nombre_area"
                    name="nombre_area"
                    value={form.nombre_area}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Ingrese el nombre del área"
                    required
                />
            </div>

            <div>
                <label htmlFor="capacidad" className="block text-gray-700 font-medium">Capacidad:</label>
                <input
                    type="number"
                    id="capacidad"
                    name="capacidad"
                    value={form.capacidad}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Ingrese la capacidad"
                    required
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Guardar Área
            </button>
        </form>
    )
}

AreaForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default AreaForm
