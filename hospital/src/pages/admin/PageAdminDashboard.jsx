import {useState, useEffect} from 'react'
import {getDashboardData,  } from '../../services/adminServices'

const  PageAdminDashboard = () => {

    const [dashboardData, setDashboardData] = useState(null)
   
    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getDashboardData()
            setDashboardData(data.message)
        } catch (error) {
            console.error('Error al obtener datos del dashboard:', error)
        }}
        fetchData()
    }, [])

    return (
        <div>
            <h1>{dashboardData}</h1>
        </div>
    )
}

export default PageAdminDashboard;