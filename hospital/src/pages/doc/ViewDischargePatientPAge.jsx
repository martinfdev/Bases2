import { useState, useEffect } from 'react'
import PatientTable from '../../components/tables/PatientTable'
import { getPatientsAssigned, dischargePatient, getReportByPatientPdf } from '../../services/doctorService'
import Waiting from '../../components/shared/Waiting'
import useAppContext from '../../hooks/useAppContext'

const ViewDischargePatientPAge = () => {
    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const [filteredPatients, setFilteredPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { addNotification } = useAppContext()

    useEffect(() => {
        setLoading(true)
        const fetchPatients = async () => {
            try {
                const data = await getPatientsAssigned()
                if(data.pacientes_asignados!==undefined || data.pacientes_asignados!==null){
                    setPatients(data.pacientes_asignados)
                }else{
                setError(data.message)
                }
            } catch (error) {
                console.error('Error al obtener pacientes:', error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPatients()
    }, [])

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredPatients(patients)
        } else {
            setFilteredPatients(patients.filter((p) => p.dpi.includes(search)))
        }
    }, [search, patients])


    const handleDischarge = async (idPatient) => {
        setLoading(true)
        try {
            const data =await dischargePatient(idPatient)
            addNotification(
                {
                    type: 'success',
                    message: data.message,
                }
            )
            setSelectedPatient(null)   
        } catch (error) {
            console.error('Error al dar de alta paciente:', error)
            setError(error)
            addNotification(
                {
                    type: 'error',
                    message: error.message,
                }
            )
        } finally {
            setLoading(false)
        }
    }

    const handleReportPatient = async (idPatient) => {
        setLoading(true)
        try {
            const data =await getReportByPatientPdf(idPatient)
            addNotification(
                {
                    type: 'success',
                    message: data.message,
                }
            )
            setSelectedPatient(null)
        } catch (error) {
            console.error('Error al obtener reporte de paciente:', error)
            setError(error)
            addNotification(
                {
                    type: 'error',
                    message: error.message,
                }
            )
        } finally {
            setLoading(false)
        }
    }

            
    const actions = [
        (patient) => (
            <button
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                onClick={() => {
                    setSelectedPatient(patient)
                }}
            >
                <svg className="w-8 h-8 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14c4 0 6 2 6 4v2M8 20v-2c0-2 2-4 6-4M12 12a4 4 0 100-8 4 4 0 000 8z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21l2 2 4-4"/></svg>
                Dar De Alta
            </button>
        ),
        (patient) => (
            <button
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => {
                    handleReportPatient(patient.id_paciente)
                }}
            >
               <svg className="w-8 h-8 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m0 0l-3-3m3 3l3-3M9 21h6M4 3h16M4 7h16"/></svg>
                Reporte
            </button>
        ),
    ]

    if (loading) return <Waiting />
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            {loading ? (
                <Waiting />
            ) : selectedPatient ? (
                <div className="flex flex-col p-6 bg-white shadow-md rounded space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Dar de alta paciente: {selectedPatient.nombre} {selectedPatient.apellido}
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => handleDischarge(selectedPatient.id_paciente)
                    }
                  >
                    Aceptar
                  </button>
                </div>
              </div>
              
            ) : (
                <div>
                    <div className="mb-4 flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Buscar por DPI..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Lista de pacientes</h1>
                    <PatientTable patients={filteredPatients} actions={actions} />
                </div>
            )}
        </div>
    )
}

export default ViewDischargePatientPAge
