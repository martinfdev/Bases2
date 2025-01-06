import PropTypes from 'prop-types'

const PatientTable = ({ patients, actions = [] }) => {
    const getState = (state) => {
        return state === '1' ? 'Activo' : 'Inactivo'
    }

    const formatDate = (fecha) => {
        const date = new Date(fecha)
        return date.toLocaleDateString()
    }

    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-gray-900 text-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Nombre</th>
                        <th className="py-2 px-4 border-b">Apellido</th>
                        <th className="py-2 px-4 border-b">DPI</th>
                        <th className="py-2 px-4 border-b">Género</th>
                        <th className="py-2 px-4 border-b">Fecha de Nacimiento</th>
                        <th className="py-2 px-4 border-b">Teléfono</th>
                        <th className="py-2 px-4 border-b">Dirección</th>
                        <th className="py-2 px-4 border-b">Área</th>
                        <th className="py-2 px-4 border-b">Estado</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id_paciente} className="hover:bg-blue-100">
                            <td className="py-2 px-4 border-b text-center">{patient.id_paciente}</td>
                            <td className="py-2 px-4 border-b">{patient.nombre}</td>
                            <td className="py-2 px-4 border-b">{patient.apellido}</td>
                            <td className="py-2 px-4 border-b">{patient.dpi}</td>
                            <td className="py-2 px-4 border-b">{patient.genero}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {formatDate(patient.fecha_nacimiento)}
                            </td>
                            <td className="py-2 px-4 border-b">{patient.telefono}</td>
                            <td className="py-2 px-4 border-b">{patient.direccion}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {patient.id_area ?? 'N/A'}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {getState(patient.estado)}
                            </td>
                            <td className="py-3 px-4 border-b flex space-x-2">
                                {actions &&
                                    actions.map((action, index) => (
                                        <div key={index}>
                                            {action(patient)}
                                        </div>
                                    ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

PatientTable.propTypes = {
    patients: PropTypes.arrayOf(PropTypes.shape({
        id_paciente: PropTypes.number.isRequired,
        nombre: PropTypes.string,
        apellido: PropTypes.string,
        dpi: PropTypes.string,
        genero: PropTypes.string,
        fecha_nacimiento: PropTypes.string,
        telefono: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        direccion: PropTypes.string,
        id_area: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        estado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).isRequired,
    actions: PropTypes.arrayOf(PropTypes.func),
}
export default PatientTable
