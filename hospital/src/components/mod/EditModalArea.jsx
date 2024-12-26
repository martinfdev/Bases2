import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Modal from '../shared/Modal'

const EditModalArea = ({ isOpen, onClose, area, onSave }) => {
  const [form, setForm] = useState({})
  useEffect(() => {
    if (area) {
      setForm({ ...area })
    }
  }, [area])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave(form)
  }

  if (!area) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Editar Area</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre_area"
            value={form.nombre_area || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Capacidad</label>
          <input
            type="number"
            name="capacidad"
            value={form.capacidad || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700"> Nuevo Nombre de Area</label>
          <input
            type="text"
            name="nuevo_nombre_area"
            value={form.nuevo_nombre_area || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
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

EditModalArea.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  area: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  specialties: PropTypes.array.isRequired
}

export default EditModalArea