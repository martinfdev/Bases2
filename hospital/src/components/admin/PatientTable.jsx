import PropsTypes from 'prop-types'

const PatientTable = ({ patients, onDelete }) => {
    const getState = (state) => {
        return state === "1" ? "Activo" : "Inactivo"
    }

    const formatDate = (fecha) => {
        const date = new Date(fecha)
        return date.toLocaleDateString()
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Lista de Pacientes</h2>
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
                    {patients.map(p => (
                        <tr key={p.id_paciente} className="hover:bg-blue-100">
                            <td className="py-2 px-4 border-b text-center">{p.id_paciente}</td>
                            <td className="py-2 px-4 border-b">{p.nombre}</td>
                            <td className="py-2 px-4 border-b">{p.apellido}</td>
                            <td className="py-2 px-4 border-b">{p.dpi}</td>
                            <td className="py-2 px-4 border-b">{p.genero}</td>
                            <td className="py-2 px-4 border-b text-center">{formatDate(p.fecha_nacimiento)}</td>
                            <td className="py-2 px-4 border-b">{p.telefono}</td>
                            <td className="py-2 px-4 border-b">{p.direccion}</td>
                            <td className="py-2 px-4 border-b text-center">{p.id_area}</td>
                            <td className="py-2 px-4 border-b text-center">{getState(p.estado)}</td>
                            <td className="py-3 px-4 flex space-x-2">
                                <button
                                    onClick={() => onDelete(p)}
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

PatientTable.propTypes = {
    patients: PropsTypes.array.isRequired,
    onDelete: PropsTypes.func.isRequired,
}

export default PatientTable