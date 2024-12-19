
import { useState, useEffect } from 'react';
import PatientTable from '../../components/admin/PatientTable'
import { getPatients } from '../../services/adminServices'

const PatientView = () => {
    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const [filteredPatients, setFilteredPatients] = useState([])
    
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await getPatients()
                setPatients(data.paciente)
            } catch (error) {
                console.error('Error al obtener datos de pacientes:', error)
            }
        }
        fetchPatients()
    }, [])

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredPatients(patients)
        } else {
            setFilteredPatients(patients.filter(p => p.dpi.includes(search)))
        }
    }, [search, patients])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Listado de Pacientes</h1>
            <div className="mb-4 flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Buscar por DPI..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="overflow-auto">
                <PatientTable
                    patients={filteredPatients}
                />
            </div>
        </div>
    )
}

export default PatientView
