import PropTypes from 'prop-types'
import Modal from '../shared/Modal'

const DeleteModalArea = ({ isOpen, onClose, onConfirm, area }) => {
  if (!area) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar el area de: {area.nombre_area}?</p>
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
          onClick={() => onConfirm(area)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
}

DeleteModalArea.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  area: PropTypes.object,
}

export default DeleteModalArea