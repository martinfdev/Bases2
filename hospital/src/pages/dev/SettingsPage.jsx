import BackupPage from '../BackupPage'
import ExportDataToCSV from '../../components/dev/ExportDataToCSV'
import LoadDataToNeo from '../../components/shared/LoadDataToNeo'

const SettingPage = () => {
    return (
        <div className="p-4 bg-gray-100 min-h-screen space-y-4">
            <h1 className="text-center font-bold text-2xl mb-4">Configuración de la Aplicación</h1>

            <div className="w-full space-y-4">
                <div className="p-4 bg-white shadow-md rounded">
                    <BackupPage />
                </div>
                <div className="p-4 bg-white shadow-md rounded">
                    <ExportDataToCSV />
                </div>
                <div className="p-4 bg-white shadow-md rounded">
                    <LoadDataToNeo />
                </div>
            </div>
        </div>
    )
}

export default SettingPage
