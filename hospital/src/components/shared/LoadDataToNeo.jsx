import { useState } from 'react'
import useAppContext from '../../hooks/useAppContext'
import Waiting from '../shared/Waiting'
import { loadDataToNeo } from '../../services/neoService'

const LoadDataToNeo = () => {
  const [areaFile, setAreaFile] = useState(null)
  const [patientFile, setPatientFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { addNotification } = useAppContext()

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const handleUpload = async () => {
    if (!areaFile || !patientFile) {
      addNotification({
        type: 'error',
        message: 'Debe seleccionar ambos archivos antes de cargar los datos',
      })
      return
    }
    setLoading(true)
    setProgress(0)
    try {
      const response = await loadDataToNeo(areaFile, patientFile, (event) => {
        const total = event.total || 1
        setProgress(Math.round((event.loaded / total) * 100))
      })
      addNotification({
        type: 'success',
        message: response.message,
      })
    } catch (error) {
      console.error('Error al cargar los datos en Neo4j:', error)
      addNotification({
        type: 'error',
        message: error.message,
      })
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="p-4 bg-gray-100 n">
      {loading && <Waiting progress={progress} />}

      {!loading && (
        <>
          <h2 className="text-2xl font-bold mb-4">Cargar Datos en Neo4j</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Archivo Área (CSV):</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e, setAreaFile)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Archivo Paciente (CSV):</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e, setPatientFile)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} transition`}
          >
            Cargar Datos
          </button>
        </>
      )}
    </div>
  )
}

export default LoadDataToNeo
