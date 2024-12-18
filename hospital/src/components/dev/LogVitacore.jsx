import { useEffect, useState } from "react"
import { getLogs } from "../../services/developerService"

const LogVitacore = () => {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const logs = await getLogs()
                setLogs(logs.logs)
            } catch (error) {
                console.error('Error al obtener datos de logs:', error)
            }
        }
        fetchLogs()
    }, [])

    // format date from 20241216102053 to 2024-12-16 10:20:53
    const formatDate = (date) => {
        const year = date.substring(0, 4)
        const month = date.substring(4, 6)
        const day = date.substring(6, 8)
        const hour = date.substring(8, 10)
        const minute = date.substring(10, 12)
        const second = date.substring(12, 14)
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Vitacora de Logs</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-center bg-gray-900 text-white">ID Log</th>
                            <th className="py-2 px-4 border-b text-center bg-gray-900 text-white">Controlador</th>
                            <th className="py-2 px-4 border-b text-center bg-gray-900 text-white">Función</th>
                            <th className="py-2 px-4 border-b text-center bg-gray-900 text-white">Descripción</th>
                            <th className="py-2 px-4 border-b text-center bg-gray-900 text-white">Estado</th>
                            <th className="py-2 px-4 border-b text-center bg-gray-900 text-white">Tipo</th>
                            <th className="py-2 px-4 border-b text-center bg-gray-900 text-white">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.log_id} className="hover:bg-blue-100">
                                <td className="py-2 px-4 border-b text-center">{log.log_id}</td>
                                <td className="py-2 px-4 border-b">{log.controlador}</td>
                                <td className="py-2 px-4 border-b">{log.function}</td>
                                <td className="py-2 px-4 border-b">{log.descripcion}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    {log.status === "INFO" ? (
                                        <span className="text-blue-500 font-semibold">INFO</span>
                                    ) : log.status === "ERROR" ? (
                                        <span className="text-red-500 font-semibold">ERROR</span>
                                    ) : (
                                        log.status
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b text-center">{log.tipo}</td>
                                <td className="py-2 px-4 border-b">
                                    {formatDate(log.log_id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LogVitacore