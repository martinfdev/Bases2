import { useState } from 'react'
import PropTypes from 'prop-types'

const LastIngresedPatientsTable = ({ patients, listSpecialities }) => {

    const [specialties] = useState(listSpecialities)

    const getSpecialtyName = (id) => {
        const specialty = specialties.find(s => s.id_especialidad === id)
        return specialty ? specialty.especialidad : 'No asignada'
    }

    const statePatient = (state) => {
        return state === 1 ? 'Activo' : 'Inactivo'
    }

    return (
        <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-gray-900 text-gray-100">
                    <tr>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Apellido</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">DPI</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Teléfono</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Dirección</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Fecha Inserción</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Fecha Nacimiento</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Género</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Especialidad</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {patients.map((user, i) => (
                        <tr key={user.id_paciente} className={`text-center border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100`}>
                            <td className="py-3 px-4">{user.id_paciente}</td>
                            <td className="py-3 px-4">{user.nombre}</td>
                            <td className="py-3 px-4">{user.apellido}</td>
                            <td className="py-3 px-4">{user.dpi}</td>
                            <td className="py-3 px-4">{user.telefono}</td>
                            <td className="py-3 px-4">{user.direccion}</td>
                            <td className="py-3 px-4">{statePatient(user.estado)}</td>
                            <td className="py-3 px-4">{user.fecha_insercion}</td>
                            <td className="py-3 px-4">{user.fecha_nacimiento}</td>
                            <td className="py-3 px-4">{user.genero}</td>
                            <td className="py-3 px-4">{getSpecialtyName(user.id_area)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

LastIngresedPatientsTable.propTypes = {
    patients: PropTypes.array.isRequired,
    listSpecialities: PropTypes.array.isRequired
}

export default LastIngresedPatientsTable
