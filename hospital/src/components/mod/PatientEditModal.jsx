import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Modal from '../shared/Modal'
import Select from '../common/Select'

const PatientEditModal = ({ isOpen, onClose, patient, listAreas, onSave }) => {
  const [form, setForm] = useState({})
  useEffect(() => {
    if (patient) {
      setForm({ ...patient })
    }
  }, [patient])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave(form)
  }

  if (!patient) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Editar Paciente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Apellido</label>
          <input
            type="text"
            name="apellido"
            value={form.apellido || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700"> DPI</label>
          <input
            type="text"
            name="dpi"
            value={form.dpi || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700"> Fecha de Nacimiento</label>
          <input
            type="text"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700"> Telefono </label>
          <input
            type="number"
            name="tefono"
            value={form.telefono || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700"> Direccion</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
            <Select
                label="Área"
                type="number"
                name="id_area"
                value={form.id_area}
                onChange={handleChange}
                options={listAreas.map(area => ({ value: area.id_area, label: area.nombre_area }))}
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

PatientEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  patient: PropTypes.object,
  onSave: PropTypes.func.isRequired,
    listAreas: PropTypes.array.isRequired,
}

export default PatientEditModal