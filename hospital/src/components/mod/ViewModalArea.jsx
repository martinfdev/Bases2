import PropTypes from 'prop-types'
import Modal from '../shared/Modal'

const ViewModalArea = ({ isOpen, onClose, area }) => {

    if (!area) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Detalles del Área</h2>
            <div className="space-y-2">
                <p><strong>Nombre:</strong> {area.nombre_area}</p>
                <p><strong>Capacidad:</strong> {area.capacidad}</p>
                <p><strong>Cantidad de Pacientes:</strong> {area.cantidad_pacientes}</p>
            </div>
        </Modal>
    )
}

ViewModalArea.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    area: PropTypes.object,
}

export default ViewModalArea