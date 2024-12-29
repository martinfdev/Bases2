import PropTypes from 'prop-types'

const AttendedPatientTable = ({ listAttendedPatients}) => {
    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className='bg-gray-900 text-gray-100'>
                    <tr>
                        <th className='py-2 px-4 border-b'>Area</th>
                        <th className='py-2 px-4 border-b'>Pacientes Atendidos</th>
                    </tr>
                </thead>
                <tbody className='text-gray-700 '>
                    {listAttendedPatients.map((patient, i) => (
                        i++,
                        <tr key={i} className="hover:bg-blue-100">
                            <td className='py-2 px-4 border-b text-center'>{patient.area}</td>
                            <td className='py-2 px-4 border-b text-center'>{patient.pacientes_atendidos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

AttendedPatientTable.propTypes = {
    listAttendedPatients: PropTypes.arrayOf(PropTypes.shape({
        area: PropTypes.string.isRequired,
        pacientes_atendidos: PropTypes.number.isRequired
    })).isRequired
}

export default AttendedPatientTable