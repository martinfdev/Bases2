import { useState } from 'react'
import { exportDataToCSV } from '../../services/neoService'
import useAppContext from '../../hooks/useAppContext'
import Waiting from '../shared/Waiting'

const ExportDataToCSV = () => {
  const [loading, setLoading] = useState(false)
  const { addNotification } = useAppContext()

  const handleExportData = async () => {
    setLoading(true)
    try {
      const data = await exportDataToCSV()
      addNotification({
        type: 'success',
        message: data.message,
      })
    } catch (error) {
      console.error('Error al exportar datos:', error)
      addNotification({
        type: 'error',
        message: 'Error al exportar datos',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-gray-100">
      {loading ? (
        <Waiting />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800">Exportar datos a CSV</h2>
          <button
            onClick={handleExportData}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
          >
            Exportar datos
          </button>
        </>
      )}
    </div>
  )
}

export default ExportDataToCSV
