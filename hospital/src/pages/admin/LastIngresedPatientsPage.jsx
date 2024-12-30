import { useEffect, useState } from 'react'
import { getSpecialties, getPatientsLastIngresed } from '../../services/adminServices'
import LastIngresedPatientsTable from '../../components/tables/LastIngresedPatientsTable'
import Waiting from '../../components/shared/Waiting'

const LastIngresedPatientsPage = () => {
    const [patients, setPatients] = useState([])
    const [specialities, setspecialities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const responsePatients = await getPatientsLastIngresed()
                setPatients(responsePatients.pacientes)
                const responseSepecialities = await getSpecialties()
                setspecialities(responseSepecialities.especialidades)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError('Ocurrió un error al intentar obtener los datos')
            }
        }
        fetchPatients()
    }
        , [])

    return (
        <>
            {loading && <Waiting />}
            {error && <p className="text-red-500">{error}</p>}
            <LastIngresedPatientsTable patients={patients} listSpecialities={specialities} />
        </>
    )
}

export default LastIngresedPatientsPage