import PropTypes from 'prop-types'

const AssigmentTable = ({ patients, onAssigment }) => {
    const getState = (state) => {
        return state === "1" ? "Activo" : "Inactivo"
    }

    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-gray-900 text-gray-100 ">
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">DPI</th>
                        <th className="py-2 px-4 border-b">Nombre</th>
                        <th className="py-2 px-4 border-b">Doctor</th>
                        <th className="py-2 px-4 border-b">Área</th>
                        <th className="py-2 px-4 border-b">Enfermera</th>
                        <th className="py-2 px-4 border-b">Estado</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id_paciente} className="hover:bg-blue-100 text-center">
                            <td className="py-2 px-4 border-b">{patient.id_paciente}</td>
                            <td className="py-2 px-4 border-b">{patient.dpi}</td>
                            <td className="py-2 px-4 border-b">{patient.nombre}</td>
                            <td className="py-2 px-4 border-b">{patient.doctor ?? "No Asignado"}</td>
                            <td className="py-2 px-4 border-b">{patient.id_area ?? "No Asignado"}</td>
                            <td className="py-2 px-4 border-b">{patient.enfermera ?? "No Asignado"}</td>
                            <td className="py-2 px-4 border-b">{getState(patient.estado)}</td>
                            <td className="py-3 px-4 flex space-x-2 justify-center">
                                <button
                                    onClick={() => onAssigment(patient)}
                                    className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 113.828 3.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Asignar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

AssigmentTable.propTypes = {
    patients: PropTypes.array.isRequired,
    onAssigment: PropTypes.func.isRequired,
}

export default AssigmentTable
