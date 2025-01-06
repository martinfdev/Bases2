import PropsTypes from 'prop-types'

const PatientTable = ({ patients, onDelete, onEdit, onView, btnStatusEdit, btnStatusDelete, btnStatusView }) => {
    const getState = (state) => {
        return state === "1" ? "Activo" : "Inactivo"
    }

    const formatDate = (fecha) => {
        const date = new Date(fecha)
        return date.toLocaleDateString()
    }

    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-gray-900 text-gray-100 ">
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
                    {patients.map(patient => (
                        <tr key={patient.id_paciente} className="hover:bg-blue-100">
                            <td className="py-2 px-4 border-b text-center">{patient.id_paciente}</td>
                            <td className="py-2 px-4 border-b">{patient.nombre}</td>
                            <td className="py-2 px-4 border-b">{patient.apellido}</td>
                            <td className="py-2 px-4 border-b">{patient.dpi}</td>
                            <td className="py-2 px-4 border-b">{patient.genero}</td>
                            <td className="py-2 px-4 border-b text-center">{formatDate(patient.fecha_nacimiento)}</td>
                            <td className="py-2 px-4 border-b">{patient.telefono}</td>
                            <td className="py-2 px-4 border-b">{patient.direccion}</td>
                            <td className="py-2 px-4 border-b text-center">{patient.id_area?? "N/A"}</td>
                            <td className="py-2 px-4 border-b text-center">{getState(patient.estado)}</td>
                            <td className="py-3 px-4 flex space-x-2">
                                <button
                                    onClick={() => onView(patient)}
                                    disabled={btnStatusView}
                                    className={btnStatusView?"flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition cursor-not-allowed "
                                        :"flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                    }
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Ver
                                </button>
                                <button
                                    onClick={() => onEdit(patient)}
                                    disabled={btnStatusEdit}
                                    className= {btnStatusEdit?"flex items-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition cursor-not-allowed "
                                        :"flex items-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"}  
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 113.828 3.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(patient)}
                                    disabled={btnStatusDelete}
                                    className={btnStatusDelete? "flex items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-not-allowed "
                                        :"flex items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    }
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

PatientTable.propTypes = {
    patients: PropsTypes.array.isRequired,
    onDelete: PropsTypes.func.isRequired,
    onEdit: PropsTypes.func.isRequired,
    onView: PropsTypes.func.isRequired,
    btnStatusDelete: PropsTypes.bool.isRequired,
    btnStatusEdit: PropsTypes.bool.isRequired,
    btnStatusView: PropsTypes.bool.isRequired,
}

export default PatientTable