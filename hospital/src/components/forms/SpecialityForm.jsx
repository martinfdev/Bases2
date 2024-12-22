import PropTypes from 'prop-types'

const SpecialityForm = ({ value, onChange, onClick }) => {
  const handleChange = (e) => {
    onChange(e)
  }

  return (
    <div className='flex flex-col gap-4 p-4 bg-white shadow-md rounded-md max-w-sm mx-auto'>
      <label
        htmlFor='especialidad'
        className='text-gray-700 font-medium'
      >
        Especialidad:
      </label>
      <input
        type='text'
        name='especialidad'
        id='especialidad'
        value={value.especialidad || ''}
        onChange={handleChange}
        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Ingrese la especialidad'
      />

      <button
        onClick={onClick}
        disabled={!value.especialidad.trim()}
        className={`py-2 px-4 rounded-md transition duration-300 ${
          !value.especialidad.trim()
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Crear Especialidad
      </button>
    </div>
  )
}

SpecialityForm.propTypes = {
  value: PropTypes.shape({
    especialidad: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SpecialityForm
