import PropTypes from 'prop-types'
import Modal from '../shared/Modal'

const PatientViewModal = ({ isOpen, onClose, patient, listAreas}) => {

    if (!patient) return null

    const getAreaName = (id) => {
        const area = listAreas.find(a => a.id_area === id)
        return area ? area.nombre_area : 'No asignada'
    }
  
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Detalles del Paciente</h2>
            <div className="space-y-2">
                <p><strong>ID:</strong> {patient.id_paciente}</p>
                <p><strong>Nombres:</strong> {patient.nombre}</p>
                <p><strong>Apellidos:</strong> {patient.apellido}</p>
                <p><strong>DPI:</strong> {patient.dpi}</p>
                <p><strong>Genero:</strong> {patient.genero}</p>
                <p><strong>Teléfono:</strong> {patient.telefono}</p>
                <p><strong>Dirección:</strong> {patient.direccion}</p>
                <p><strong>Estado:</strong> {patient.estado === 1 ? 'Activo' : 'Inactivo'}</p>
                <p><strong>Fecha de Nacimiento:</strong> {patient.fecha_nacimiento}</p>
                <p><strong>Area:</strong> {getAreaName(patient.id_area)}</p>
            </div>
        </Modal>
    )
}

PatientViewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    patient: PropTypes.object,
    listAreas: PropTypes.array.isRequired
}

export default PatientViewModal