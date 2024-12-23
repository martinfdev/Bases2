import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Modal from '../shared/Modal'

const EditUserModal = ({ isOpen, onClose, user, onSave, specialties }) => {
  const [form, setForm] = useState({})
  useEffect(() => {
    if (user) {
      setForm({ ...user })
    }
  }, [user])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave(form)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  form.fecha_vencimiento_colegiado = formatDate(form.fecha_vencimiento_colegiado)


  if (!user) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombres</label>
          <input
            type="text"
            name="nombres"
            value={form.nombres || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={form.apellidos || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="contrasena"
            placeholder="********"
            value={form.constrasena}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="number"
            name="telefono"
            value={form.telefono || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">DPI</label>
          <input
            type="number"
            name="dpi"
            value={form.dpi || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Dirección</label>
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
          <label className="block text-gray-700">Rol</label>
          <select
            name="id_rol"
            value={form.id_rol}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          >
            <option value="1">Administrador</option>
            <option value="2">Doctor</option>
            <option value="3">Enfermera</option>
            <option value="4">Desarrollador</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Especialidad</label>
          <select
            name="id_especialidad"
            value={form.id_especialidad}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          >
            <option value="">Seleccione una especialidad</option>
            {specialties.map(specialty => (
              <option key={specialty.id_especialidad} value={specialty.id_especialidad}>
                {specialty.especialidad}
              </option>
            ))}

          </select>
        </div>
        <div>
          <label className="block text-gray-700">Fecha Vencimiento Colegiado</label>
          <input
            type="date"
            name="fecha_vencimiento_colegiado"
            value={form.fecha_vencimiento_colegiado?? ''}
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

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  specialties: PropTypes.array.isRequired
}

export default EditUserModal