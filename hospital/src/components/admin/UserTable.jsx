import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {getSpecialties} from '../../services/adminServices'

const UserTable = ({ users, onEdit, onDelete, onView }) => {

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

    const getSpecialtyName = (id) => {
        const specialty = specialties.find(s => s.id_especialidad === id)
        return specialty ? specialty.especialidad : 'No asignada'
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-900 text-gray-100">
                <tr>
                    <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Nombres</th>
                    <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Apellidos</th>
                    <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">DPI</th>
                    <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Correo</th>
                    <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Teléfono</th>
                    <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Dirección</th>
                    <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Especialidad</th>
                    <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {users.map((user, i) => (
                    <tr key={i} className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                        <td className="py-3 px-4">{user.nombres}</td>
                        <td className="py-3 px-4">{user.apellidos}</td>
                        <td className="py-3 px-4">{user.dpi}</td>
                        <td className="py-3 px-4">{user.correo}</td>
                        <td className="py-3 px-4">{user.telefono}</td>
                        <td className="py-3 px-4">{user.direccion}</td>
                        <td className="py-3 px-4">{getSpecialtyName(user.id_especialidad)}</td>
                        <td className="py-3 px-4 flex space-x-2">
                            <button
                                onClick={() => onView(user)}
                                className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Ver
                            </button>
                            <button
                                onClick={() => onEdit(user)}
                                className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 113.828 3.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(user)}
                                className="flex items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
}

export default UserTable