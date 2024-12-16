import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../shared/Modal'
import {getSpecialties} from '../../services/adminServices'

const ViewUserModal = ({ isOpen, onClose, user }) => {
    const [specialties, setSpecialties] = useState([])

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const data = await getSpecialties()
                setSpecialties(data.especialidades)
            } catch (error) {
                console.error('Error al obtener datos de especialidades:', error)
            }
        }
        fetchSpecialties()
    }, [])

    if (!user) return null

    const getSpecialtyName = (id) => {
        const specialty = specialties.find(s => s.id_especialidad === id)
        return specialty ? specialty.especialidad : 'No asignada'
    }

    const getRoleName = (id) => {
        switch (id) {
            case 1:
                return 'Administrador'
            case 2:
                return 'Doctor'
            case 3:
                return 'Enfermera'
            case 4:
                return 'Desarrollador'
            default:
                return 'Desconocido'
        }
    }
        
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Detalles del Usuario</h2>
            <div className="space-y-2">
                <p><strong>Nombres:</strong> {user.nombres}</p>
                <p><strong>Apellidos:</strong> {user.apellidos}</p>
                <p><strong>DPI:</strong> {user.dpi}</p>
                <p><strong>Correo:</strong> {user.correo}</p>
                <p><strong>Teléfono:</strong> {user.telefono}</p>
                <p><strong>Dirección:</strong> {user.direccion}</p>
                <p><strong>Especialidad:</strong> {getSpecialtyName(user.id_especialidad)}</p>
                <p><strong>Fecha de Ingreso:</strong> {user.fecha_ingreso}</p>
                <p><strong>Fecha de Vencimiento Colegiado:</strong> {user.fecha_vencimiento_colegiado}</p>
                <p><strong>Estado:</strong> {user.estado === 1 ? 'Activo' : 'Inactivo'}</p>
                <p><strong>Rol:</strong> {getRoleName(user.id_rol)}</p>
                <p><strong>Género:</strong> {user.genero}</p>
            </div>
        </Modal>
    )
}

ViewUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object,
}

export default ViewUserModal