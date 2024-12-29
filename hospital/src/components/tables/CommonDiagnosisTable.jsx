import PropTypes from 'prop-types'

const AttendedPatientTable = ({ listCommonDiagnosis}) => {
    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className='bg-gray-900 text-gray-100'>
                    <tr>
                        <th className='py-2 px-4 border-b'>No.</th>
                        <th className='py-2 px-4 border-b'>Diagnostico</th>
                        <th className='py-2 px-4 border-b'>Pacientes Atendidos</th>
                    </tr>
                </thead>
                <tbody className='text-gray-700 '>
                    {listCommonDiagnosis.map((diagnosis, i) => (
                        i++,
                        <tr key={i} className="hover:bg-blue-100">
                            <td className='py-2 px-4 border-b text-center'>{i}</td>
                            <td className='py-2 px-4 border-b text-center'>{diagnosis.diagnostico}</td>
                            <td className='py-2 px-4 border-b text-center'>{diagnosis.frecuencia}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

AttendedPatientTable.propTypes = {
    listCommonDiagnosis: PropTypes.arrayOf(PropTypes.shape({
        diagnostico: PropTypes.string.isRequired,
        frecuencia: PropTypes.number.isRequired
    })).isRequired
}

export default AttendedPatientTable