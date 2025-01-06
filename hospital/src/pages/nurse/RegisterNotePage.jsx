import { useState, useEffect } from 'react'
import PatientTable from '../../components/tables/PatientTable'
import { assignedPatients } from '../../services/nurseServices'
import { createNote } from '../../services/mongoServices'
import AddNoteModal from '../../components/mod/AddNoteModal'
import Waiting from '../../components/shared/Waiting'
import useAppContext from '../../hooks/useAppContext'

const RegisterNotePage = () => {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { addNotification } = useAppContext()

  useEffect(() => {
    setLoading(true)
    const fetchPatients = async () => {
      try {
        const data = await assignedPatients()
        setPatients(data.paciente_asignados)
      } catch (error) {
        console.error('Error al obtener pacientes:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPatients()
  }, [])

  const handleSaveNote = async (noteData) => {
    try {
      const data = await createNote(noteData)
      addNotification({
        type: 'success',
        message: data.message,
      })
    } catch (error) {
      console.error('Error al crear nota:', error)
      addNotification({
        type: 'error',
        message: error.message,
      })
    }finally{
      setLoading(false)
      setIsModalOpen(false)
    }
  }

  const actions = [
    (patient) => (
      <button
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => {
          setSelectedPatient(patient)
          setIsModalOpen(true)
        }}
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 20 20">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 113.828 3.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Agregar Nota
      </button>
    ),
  ]

  return (
    loading ? <Waiting /> :
      error ? <div>Error: {error.message}</div> :
        <div>
          <PatientTable
            patients={patients}
            actions={actions}
          />
          <AddNoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveNote}
            patient={selectedPatient}
          />

        </div>
  )
}

export default RegisterNotePage
