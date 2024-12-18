import { FaTools, FaClipboardList, FaUserShield, FaBookMedical, FaEdit, FaCogs } from 'react-icons/fa'
import Layout from './Layout'

const DeveloperLayout = () => {
    const developerMenuItems = [
        {
            section: null,
            label: 'Dashboard',
            path: '/developer/dashboard',
            icon: <FaTools />,
        },
        {
            section: 'Bitácora',
            label: 'Visualizar Bitácora',
            path: '/developer/logs',
            icon: <FaClipboardList />,
        },
        {
            section: 'Gestión de Usuarios',
            label: 'Crear Usuario',
            path: '/developer/users/create',
            icon: <FaUserShield />,
        },
        {
            section: 'Expedientes Médicos',
            label: 'Ver Expedientes',
            path: '/developer/records/view',
            icon: <FaBookMedical />,
        },
        {
            section: 'Expedientes Médicos',
            label: 'Editar Expedientes',
            path: '/developer/records/edit',
            icon: <FaEdit />,
        },
        {
            section: 'Configuración',
            label: 'Ajustes del Sistema',
            path: '/developer/settings',
            icon: <FaCogs />,
        },
    ]

    return (
        <Layout menuItems={developerMenuItems} />
    )
}

export default DeveloperLayout