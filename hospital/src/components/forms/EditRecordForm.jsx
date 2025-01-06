import { useState } from 'react'
import PropTypes from 'prop-types'

const EditRecordForm = ({ expediente, onSubmit, isEditableStatus }) => {
  const [formData, setFormData] = useState(expediente)
  const [isEditable, setIsEditable] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    const keys = name.split('.')
    setFormData((prev) => {
      const data = { ...prev }
      let ref = data
      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]]
      }
      ref[keys[keys.length - 1]] = value
      return data
    })
  }

  const mapFieldsWithTitles = (prefix, obj, parentLabel = '') => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const currentLabel = `${parentLabel}${parentLabel ? ' - ' : ''}${key}`
      if (typeof value === 'object' && value !== null) {
        return [
          { type: 'title', label: currentLabel },
          ...mapFieldsWithTitles(`${prefix}.${key}`, value, currentLabel),
        ]
      }
      return {
        label: key,
        name: `${prefix}.${key}`,
        type: 'text',
        value: value ?? '',
      }
    })
  }

  const sections = [
    {
      title: 'Datos del Paciente',
      fields: mapFieldsWithTitles('datosPaciente', formData.datosPaciente),
    },
    {
      title: 'Antecedentes',
      fields: mapFieldsWithTitles('antecedentes', formData.antecedentes),
    },
    {
      title: 'Contacto de Emergencia',
      fields: formData.contactoEmergencia.map((contact, index) =>
        mapFieldsWithTitles(`contactoEmergencia.${index}`, contact)
      ).flat(),
    },
    {
      title: 'Historial de Ingresos',
      fields: formData.historialIngresos.flatMap((historial, index) =>
        mapFieldsWithTitles(`historialIngresos.${index}`, historial)
      ),
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">...</h2>
        {isEditableStatus && (
          <button
            type="button"
            className={`px-4 py-2 rounded ${isEditable ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} transition`}
            onClick={() => setIsEditable((prev) => !prev)}
          >
            {isEditable ? 'Cancelar Edición' : 'Editar'}
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">{sections[currentPage].title}</h2>

      {sections[currentPage].fields.map((field, index) => (
        <div key={index}>
          {field.type === 'title' ? (
            <h3 className="text-lg font-semibold mt-4 mb-2">{field.label}</h3>
          ) : (
            <>
              <label className="block text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                disabled={!isEditable || !isEditableStatus}
                className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring ${!isEditable ? 'bg-gray-200 cursor-not-allowed' : ''}`}
              />
            </>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        {currentPage < sections.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, sections.length - 1))}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Siguiente
          </button>
        ) : (
          isEditableStatus && isEditable && (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Guardar
            </button>
          )
        )}
      </div>
    </form>
  )
}

EditRecordForm.propTypes = {
  expediente: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditableStatus: PropTypes.bool,
}

export default EditRecordForm
