import { useState } from 'react'
import { LiaFileDownloadSolid } from 'react-icons/lia'
import { IoCodeDownload } from 'react-icons/io5'
import {
    downloadReportArea, downloadReportPatients, downloadReportDiagnosis,
    downloadReportAreaExcel, downloadReportPatientsExcel, downloadReportDiagnosisExcel
} from '../../services/adminServices'
import DownloadButton from '../../components/shared/DownloadButton'
import useAppContext from '../../hooks/useAppContext'
import Waiting from '../../components/shared/Waiting'

const DownloadReportsPage = () => {
    const { addNotification } = useAppContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleDownloadAreaFile = async () => {
        setLoading(true)
        try {
            await downloadReportArea()
            addNotification({
                type: 'success',
                message: 'Reporte de Areas descargado exitosamente'
            })
        } catch (error) {
            console.error('Error al descargar reporte Areas', error)
            setError(error.message)
            addNotification({
                type: 'error',
                message: 'Error al descargar reporte de Areas'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadPatientFile = async () => {
        setLoading(true)
        try {
            await downloadReportPatients()
            addNotification({
                type: 'success',
                message: 'Reporte de Pacientes descargado exitosamente'
            })
        } catch (error) {
            console.error('Error al descargar reporte Pacientes', error)
            setError(error.message)
            addNotification({
                type: 'error',
                message: 'Error al descargar reporte de Pacientes'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadDiagnosisFile = async () => {
        setLoading(true)
        try {
            await downloadReportDiagnosis()
            addNotification({
                type: 'success',
                message: 'Reporte de Diagnósticos descargado exitosamente'
            })
        } catch (error) {
            console.error('Error al descargar reporte Diagnósticos', error)
            setError(error.message)
            addNotification({
                type: 'error',
                message: 'Error al descargar reporte de Diagnósticos'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadAreaExcel = async () => {
        setLoading(true)
        try {
            await downloadReportAreaExcel()
            addNotification({
                type: 'success',
                message: 'Reporte de Areas en Excel descargado exitosamente'
            })
        } catch (error) {
            console.error('Error al descargar reporte Areas en Excel', error)
            setError(error.message)
            addNotification({
                type: 'error',
                message: 'Error al descargar reporte de Areas en Excel'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadPatientExcel = async () => {
        setLoading(true)
        try {
            await downloadReportPatientsExcel()
            addNotification({
                type: 'success',
                message: 'Reporte de Pacientes en Excel descargado exitosamente'
            })
        } catch (error) {
            console.error('Error al descargar reporte Pacientes en Excel', error)
            setError(error.message)
            addNotification({
                type: 'error',
                message: 'Error al descargar reporte de Pacientes en Excel'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadDiagnosisExcel = async () => {
        setLoading(true)
        try {
            await downloadReportDiagnosisExcel()
            addNotification({
                type: 'success',
                message: 'Reporte de Diagnósticos en Excel descargado exitosamente'
            })
        } catch (error) {
            console.error('Error al descargar reporte Diagnósticos en Excel', error)
            setError(error.message)
            addNotification({
                type: 'error',
                message: 'Error al descargar reporte de Diagnósticos en Excel'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        loading ? (
            <Waiting />
        ) : (
            <div className='flex flex-col items-center  w-full h-full gap-4'>
                <div
                    className="flex flex-wrap items-baseline justify-between gap-4 w-full max-w-full mx-auto p-6 bg-gray-50 rounded-lg"
                >
                    {error && <p className="text-2xl font-semibold">{error}</p>}
                    <div>
                        <DownloadButton
                            label="Reporte de Areas"
                            onDownload={handleDownloadAreaFile}
                            icon={LiaFileDownloadSolid}
                            bgColor="bg-blue-500"
                        />
                    </div>
                    <div>
                        <DownloadButton
                            label="Reporte de Pacientes"
                            onDownload={handleDownloadPatientFile}
                            icon={LiaFileDownloadSolid}
                            bgColor="bg-green-600"
                        />
                    </div>
                    <div>
                        <DownloadButton
                            label="Reporte de Diagnósticos"
                            onDownload={handleDownloadDiagnosisFile}
                            icon={LiaFileDownloadSolid}
                            bgColor="bg-yellow-600"
                        />
                    </div>
                </div>
                <div
                    className="flex flex-wrap items-baseline justify-between gap-4 w-full max-w-full mx-auto p-6 bg-gray-50 rounded-lg"
                >
                    <div>
                        <DownloadButton
                            label="Reporte de Areas en Excel"
                            onDownload={handleDownloadAreaExcel}
                            icon={IoCodeDownload}
                            bgColor="bg-blue-500"
                        />
                    </div>
                    <div>
                        <DownloadButton
                            label="Reporte de Pacientes en Excel"
                            onDownload={handleDownloadPatientExcel}
                            icon={IoCodeDownload}
                            bgColor="bg-green-600"
                        />
                    </div>
                    <div>
                        <DownloadButton
                            label="Reporte de Diagnósticos en Excel"
                            onDownload={handleDownloadDiagnosisExcel}
                            icon={IoCodeDownload}
                            bgColor="bg-yellow-600"
                        />
                    </div>
                </div>
            </div>
        )
    )
}

export default DownloadReportsPage