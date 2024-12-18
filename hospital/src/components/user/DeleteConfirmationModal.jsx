import PropTypes from 'prop-types'
import Modal from '../shared/Modal'

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, user }) => {
  if (!user) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar al usuario con DPI: {user.dpi}?</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button 
          type="button" 
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button 
          type="button"
          onClick={() => onConfirm(user)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
}

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default DeleteConfirmationModal