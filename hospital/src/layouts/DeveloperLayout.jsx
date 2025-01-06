import {
    FaTools, FaClipboardList, FaUserShield, FaBookMedical, FaEdit, FaCogs, FaHandHoldingMedical,
    FaUserFriends,  FaMap, FaUsersSlash, FaUserClock
} from 'react-icons/fa'
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
            section: 'Gestión de Usuarios',
            label: 'Listar Usuarios',
            path: '/developer/users/list',
            icon: <FaUserFriends />
        },
        {
            section: 'Especialidades',
            label: 'Crear Especialidad',
            path: '/developer/speciality/create',
            icon: <FaHandHoldingMedical />
        },
        {
            section: 'Especialidades',
            label: 'Ver Especialidades',
            path: '/developer/speciality/view',
            icon: <FaClipboardList />
        },
        // {
        //     section: 'Gestión de Áreas',
        //     label: 'Crear Área',
        //     path: '/developer/areas/create',
        //     icon: <FaMapMarkedAlt />
        // },
        {
            section: 'Gestión de Pacientes',
            label: 'Lista Pacientes',
            path: '/developer/patients/list',
            icon: <FaUserFriends />
        },
        {
            section: 'Gestión de Pacientes',
            label: 'Pacientes sin Área',
            path: '/developer/patients/dont-have-area',
            icon: <FaUsersSlash />
        },
        {
            section: 'Gestión de Pacientes',
            label: 'Ultimos Pacientes Ingresados',
            path: '/developer/patients/last-ingresed',
            icon: <FaUserClock />
        },
        {
            section: 'Gestión de Áreas',
            label: 'Listar Áreas',
            path: '/developer/areas/list',
            icon: <FaMap />
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