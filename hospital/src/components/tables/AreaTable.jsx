import PropTypes from 'prop-types'

const AreaTable = ({ areas, onEdit, onDelete, onView }) => {
    return (
        <div className="w-full  mx-auto p-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className='bg-gray-900 text-gray-100'>
                    <tr>
                        <th className='py-2 px-4 border-b'>ID</th>
                        <th className='py-2 px-4 border-b'>Nombre</th>
                        <th className='py-2 px-4 border-b'>Capacidad</th>
                        <th className='py-2 px-4 border-b'>Pacientes</th>
                        <th className='py-2 px-4 border-b'>Acciones</th>
                    </tr>
                </thead>
                <tbody className='text-gray-700 '>
                    {areas.map((area) => (
                        <tr key={area.id_area} className="hover:bg-blue-100">
                            <td className='py-2 px-4 border-b text-center'>{area.id_area}</td>
                            <td className='py-2 px-4 border-b text-center'>{area.nombre_area}</td>
                            <td className='py-2 px-4 border-b text-center'>{area.capacidad}</td>
                            <td className='py-2 px-4 border-b text-center'>{area.cantidad_pacientes}</td>
                            <td className='py-3 px-4 border-b flex space-x-8 items-center justify-center'>
                                <button
                                    onClick={() => onView(area)}
                                    className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Ver
                                </button>
                                <button
                                    onClick={() => onEdit(area.id_area)}
                                    className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 113.828 3.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(area.id_area)}
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

AreaTable.propTypes = {
    areas: PropTypes.arrayOf(PropTypes.shape({
        id_area: PropTypes.number.isRequired,
        nombre_area: PropTypes.string.isRequired,
        capacidad: PropTypes.number.isRequired,
        cantidad_pacientes: PropTypes.number.isRequired,
    })).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired
}

export default AreaTable