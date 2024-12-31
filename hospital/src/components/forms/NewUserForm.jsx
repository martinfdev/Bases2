import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import useAppContext from "../../hooks/useAppContext"

const NewUserForm = ({ currentUserRole, registerUser, listSpecialities }) => {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    id_rol: 0,
    telefono: "",
    dpi: "",
    genero: "",
    direccion: "",
    fecha_ingreso: "",
    id_especialidad: 0,
    fecha_vencimiento_colegiado: "",
    estado: 0,
  })

  const [isNurse, setIsNurse] = useState(false)
  const { addNotification } = useAppContext()

  // Validación del DPI: 13 dígitos
  const dpiRegex = /^\d{13}$/

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "id_rol") {
      setForm((prev) => ({ ...prev, [name]: Number(value) }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const clearForm = () => {
    setForm({
      nombres: "",
      apellidos: "",
      correo: "",
      contrasena: "",
      id_rol: 0,
      telefono: "",
      dpi: "",
      genero: "",
      direccion: "",
      fecha_ingreso: "",
      id_especialidad: 0,
      fecha_vencimiento_colegiado: "",
      estado: 0,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!dpiRegex.test(form.dpi)) {
      addNotification({
        type: "error",
        message: "El DPI debe contener exactamente 13 dígitos",
      })
      return
    }
    registerUser(form)
    clearForm()
  }

  useEffect(() => {
    setIsNurse(form.id_rol === 3 || form.id_rol === 1) 
  }, [form.id_rol])

  const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Doctor" },
    { id: 3, name: "Enfermera" },
  ]

  const getAvailableRoles = () => {
    if (currentUserRole === 1) {
      return roles.filter((role) => role.id === 2 || role.id === 3)
    } else if (currentUserRole === 4) {
      return roles
    }
    return []
  }

  const availableRoles = getAvailableRoles()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombres</label>
            <input
              type="text"
              name="nombres"
              value={form.nombres}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Rol</label>
            <select
              name="id_rol"
              value={form.id_rol}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Seleccione un rol</option>
              {availableRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Teléfono</label>
            <input
              type="number"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">DPI</label>
            <input
              type="number"
              name="dpi"
              value={form.dpi}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Género</label>
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Seleccione un género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Fecha de Ingreso</label>
            <input
              type="date"
              name="fecha_ingreso"
              value={form.fecha_ingreso}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {!isNurse && (
            <div className="mb-4">
              <label className="block text-gray-700">ID Especialidad</label>
              <select
                type="number"
                name="id_especialidad"
                value={form.id_especialidad}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Seleccione una especialidad</option>
                {listSpecialities.map((especialidad) => (
                  <option
                    key={especialidad.id_especialidad}
                    value={especialidad.id_especialidad}
                  >
                    {especialidad.especialidad}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!isNurse && (
            <div className="mb-4">
              <label className="block text-gray-700">Fecha Vencimiento Colegiado</label>
              <input
                type="date"
                name="fecha_vencimiento_colegiado"
                value={form.fecha_vencimiento_colegiado}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Seleccione un estado</option>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  )
}

NewUserForm.propTypes = {
  currentUserRole: PropTypes.number,
  registerUser: PropTypes.func.isRequired,
  listSpecialities: PropTypes.array.isRequired
}

export default NewUserForm
