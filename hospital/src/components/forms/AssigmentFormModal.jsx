import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from '../shared/Modal'
import Select from '../common/Select'

const AssigmentFormModal = ({isOpen, onClose, patient, areas, doctors, nurses, onSave}) => {
  const [form, setForm] = useState({
    area: '',
    doctor: '',
    nurse: ''
  })

  useEffect(() => {
    if(patient) {
      setForm({
        area: patient.id_area || '',
        doctor: patient.id_doctor || '',
        nurse: patient.id_enfermera || ''
      })
    }
  }, [patient])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataToSend = {
      id_paciente: patient.id_paciente,
      id_area: parseInt(form.area, 10),
      id_doctor: parseInt(form.doctor, 10),
      id_enfermera: parseInt(form.nurse, 10)
    }
    onSave(dataToSend)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 p-4">Asignar al paciente</h2>
      <p className="mb-2 text-gray-500">
        Paciente: <strong>{patient?.nombre} {patient?.apellido}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Área</label>
          <Select
            name="area"
            value={form.area}
            onChange={handleChange}
            options={[
                { value: '', label: '--Seleccione un área--' },
                ...areas.map(area => ({
              value: area.id_area,
              label: area.nombre_area
            }))]}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Doctor</label>
          <Select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            options={[
                { value: '', label: '--Seleccione un doctor--' },
                ...doctors.map(doc => ({
              value: doc.id_usuario,
              label: `${doc.nombres} ${doc.apellidos}`
            }))]}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Enfermera(o)</label>
          <Select
            name="nurse"
            value={form.nurse}
            onChange={handleChange}
            options={[
                { value: '', label: '--Seleccione una enfermera--' },
                ...nurses.map(n => ({
              value: n.id_usuario,
              label: `${n.nombres} ${n.apellidos}`  
            }))]}
            required
          />
        </div>

        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 mr-2 rounded"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  )
}

AssigmentFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  patient: PropTypes.object,
  areas: PropTypes.array.isRequired,
  doctors: PropTypes.array.isRequired,
  nurses: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired
}

export default AssigmentFormModal
