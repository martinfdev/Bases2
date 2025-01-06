import PropTypes from 'prop-types'
import { useState } from 'react'
import Modal from '../shared/Modal'

const AddNoteModal = ({ isOpen, onClose, onSave, patient }) => {
    const [form, setForm] = useState({
        _id: patient?.dpi ?? '',
        contenido: {
            fecha: '',
            responsable: '',
            descripcion: '',
            acciones: [''],
            observaciones: '',
        },
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name.startsWith('acciones')) {
            const index = parseInt(name.split('.')[1], 10)
            const updatedAcciones = [...form.contenido.acciones]
            updatedAcciones[index] = value
            setForm((prev) => ({
                ...prev,
                contenido: {
                    ...prev.contenido,
                    acciones: updatedAcciones,
                },
            }))
        } else if (Object.keys(form.contenido).includes(name)) {
            setForm((prev) => ({
                ...prev,
                contenido: {
                    ...prev.contenido,
                    [name]: value,
                },
            }))
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleAddAccion = () => {
        setForm((prev) => ({
            ...prev,
            contenido: {
                ...prev.contenido,
                acciones: [...prev.contenido.acciones, ''],
            },
        }))
    }

    const handleRemoveAccion = (index) => {
        setForm((prev) => ({
            ...prev,
            contenido: {
                ...prev.contenido,
                acciones: prev.contenido.acciones.filter((_, i) => i !== index),
            },
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(form)
        clearForm()
    }

    const clearForm = () => {
        setForm({
            _id: patient?.dpi ?? '',
            contenido: {
                fecha: '',
                responsable: '',
                descripcion: '',
                acciones: [''],
                observaciones: '',
            },
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Crear Nota Para Paciente</h2>
            <p className="text-gray-700 mb-4 font-semibold"> {patient?.nombre?? ""} {patient?.apellido?? ""} </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">DPI</label>
                    <input
                        type="text"
                        name="_id"
                        value={form._id}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Fecha</label>
                    <input
                        type="datetime-local"
                        name="fecha"
                        value={form.contenido.fecha}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Responsable</label>
                    <input
                        type="text"
                        name="responsable"
                        value={form.contenido.responsable}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={form.contenido.descripcion}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Acciones</label>
                    {form.contenido.acciones.map((accion, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                name={`acciones.${index}`}
                                value={accion}
                                onChange={handleChange}
                                className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring"
                                
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveAccion(index)}
                                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddAccion}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Añadir Acción
                    </button>
                </div>
                <div>
                    <label className="block text-gray-700">Observaciones</label>
                    <textarea
                        name="observaciones"
                        value={form.contenido.observaciones}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                    ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    )
}

AddNoteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    patient: PropTypes.shape({
        dpi: PropTypes.string.isRequired,
        nombre: PropTypes.string,
        apellido: PropTypes.string,
    }),
}

export default AddNoteModal
