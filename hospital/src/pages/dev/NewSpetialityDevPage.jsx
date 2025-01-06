import { useState } from 'react'
import SpecialityForm from '../../components/forms/SpecialityForm'
import { createSpecialty } from '../../services/developerService'
import useAppContext from '../../hooks/useAppContext'

const NewSpetialityDevPage = () => {
  const [speciality, setSpeciality] = useState({
    especialidad: ''
  })
  const [error, setError] = useState(null)
  const { addNotification } = useAppContext()

  const handleChange = (e) => {
    setSpeciality(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleClick = async () => {
    try {
      if (!speciality.especialidad.trim()) {
        throw new Error('Debe ingresar el nombre de la especialidad')
      }
      await createSpecialty(speciality)
      addNotification({
        type: 'success',
        message: 'Especialidad creada correctamente'
      })
      // Reseteamos el valor del input
      setSpeciality({ 
        especialidad: '' 
      })
    } catch (err) {
      console.error('Error al crear especialidad:', err)
      setError(err.message)
      addNotification({
        type: 'error',
        message: 'Error al crear especialidad'
      })
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center mt-5 text-gray-700 text-2xl font-bold mb-5'>
        Nueva Especialidad
      </h1>

      {error && (
        <p className='text-red-500 text-center mb-5'>
          {error}
        </p>
      )}

      <SpecialityForm 
        value={speciality} 
        onChange={handleChange} 
        onClick={handleClick} 
      />
    </div>
  )
}

export default NewSpetialityDevPage
