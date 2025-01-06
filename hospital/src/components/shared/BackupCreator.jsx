import PropTypes from 'prop-types'

const BackupCreator = ({ onCreateBackup }) => {

  const handleCreateBackup = async () => {
    await onCreateBackup()
  }

  return (
    <div className="p-6 bg-white shadow-md rounded space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Crear Backup</h2>
      <button
        onClick={handleCreateBackup}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Iniciar Backup
      </button>
    </div>
  )
}

BackupCreator.propTypes = {
  onCreateBackup: PropTypes.func.isRequired,
}

export default BackupCreator
