import { useEffect, useState } from 'react'
import { getSpecialties, getPatientsLastIngresed } from '../../services/developerService'
import LastIngresedPatientsTable from '../../components/tables/LastIngresedPatientsTable'
import Waiting from '../../components/shared/Waiting'

const LastIngresedPatientsDevPage = () => {
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
            <h1 className='p-4 text text-center font-semibold text-2xl'>Ultimos Pacientes Ingresados</h1>
            <LastIngresedPatientsTable patients={patients} listSpecialities={specialities} />
        </>
    )
}

export default LastIngresedPatientsDevPage