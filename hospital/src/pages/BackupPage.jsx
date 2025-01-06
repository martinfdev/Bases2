import { useState } from 'react'
import BackupCreator from '../components/shared/BackupCreator'
import { createBackup } from '../services/mongoServices'
import useAppContext from '../hooks/useAppContext'
import Waiting from '../components/shared/Waiting'

const BackupPage = () => {
  const { addNotification } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [backupStatus, setBackupStatus] = useState(null)

  const handleCreateBackup = async () => {
    setLoading(true)
    setBackupStatus(null) 
    try {
      const data = await createBackup()
      setBackupStatus(data)
      addNotification({
        type: 'success',
        message: data.message,
      })
      return data
    } catch (error) {
      console.error('Error al crear backup:', error)
      addNotification({
        type: 'error',
        message: error.message || 'Error inesperado al crear el backup.',
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-gray-100">
      {loading ? (
        <Waiting />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Administración de Backups</h1>
          <BackupCreator onCreateBackup={handleCreateBackup} />
          {backupStatus && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Resultados del Backup</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded bg-gray-50">
                  <strong>MongoDB:</strong> {backupStatus.mongo_status}
                  <br />
                  <strong>ID Archivo:</strong> {backupStatus.file_mongo_id || 'N/A'}
                </div>
                <div className="p-4 border rounded bg-gray-50">
                  <strong>Redis:</strong> {backupStatus.redis_status}
                  <br />
                  <strong>ID Archivo:</strong> {backupStatus.file_redis_id || 'N/A'}
                </div>
                <div className="p-4 border rounded bg-gray-50">
                  <strong>SQL:</strong> {backupStatus.sql_status}
                  <br />
                  <strong>ID Archivo:</strong> {backupStatus.file_sql_id || 'N/A'}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BackupPage
