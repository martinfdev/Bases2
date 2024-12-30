import {
    FaTachometerAlt, FaUserCog, FaUserFriends, FaHandHoldingMedical, FaUserClock,
    FaMapMarkedAlt, FaMap, FaUserCheck, FaDiagnoses,FaUsersSlash,
    FaFileExport, FaChartPie, FaEnvelopeOpenText, FaInbox,
    FaUserPlus
} from 'react-icons/fa'
import { MdOutlineListAlt } from 'react-icons/md'
import Layout from '../layouts/Layout'


const AdminLayout = () => {
    const menuItems = [
        {
            section: null,
            label: 'Dashboard',
            path: '/admin/dashboard',
            icon: <FaTachometerAlt />
        },
        {
            section: 'Gestión de Usuarios',
            label: 'Crear Usuario',
            path: '/admin/users/create',
            icon: <FaUserCog />
        },
        {
            section: 'Gestión de Usuarios',
            label: 'Listar Usuarios',
            path: '/admin/users/list',
            icon: <FaUserFriends />
        },
        //   {
        //       section: 'Gestión de Usuarios',
        //       label: 'Usuarios Inactivos',
        //       path: '/admin/users/inactive',
        //       icon: <FaUserSlash />
        //   },
        {
            section: 'Especialidades',
            label: 'Crear Especialidad',
            path: '/admin/speciality/create',
            icon: <FaHandHoldingMedical />
        },
        {
            section: 'Especialidades',
            label: 'Listar Especialidades',
            path: '/admin/speciality/list',
            icon: <MdOutlineListAlt />
        },
        {
            section: 'Gestión de Pacientes',
            label: 'Crear Paciente',
            path: '/admin/patients/create',
            icon: <FaUserPlus />
        },
        {
            section: 'Gestión de Pacientes',
            label: 'Listar Pacientes',
            path: '/admin/patients/list',
            icon: <FaUserFriends />
        },
        {
            section: 'Gestión de Pacientes',
            label: 'Pacientes sin Área',
            path: '/admin/patients/dont-have-area',
            icon: <FaUsersSlash/>
        },
        {
            section: 'Gestión de Pacientes',
            label: 'Ultimos Pacientes Ingresados',
            path: '/admin/patients/last-ingresed',
            icon: <FaUserClock  />
        },

        {
            section: 'Gestión de Áreas',
            label: 'Crear Área',
            path: '/admin/areas/create',
            icon: <FaMapMarkedAlt />
        },
        {
            section: 'Gestión de Áreas',
            label: 'Listar Áreas',
            path: '/admin/areas/list',
            icon: <FaMap />
        },
        {
            section: 'Gestión de Áreas',
            label: 'Pacientes Atendidos',
            path: '/admin/areas/attended/patients',
            icon: <FaUserCheck />
        },
        //   {
        //       section: 'Bitácora del Sistema',
        //       label: 'Visualizar Bitácora',
        //       path: '/admin/logs',
        //       icon: <FaClipboardList />
        //   },
        {
            section: 'Reportes',
            label: 'Diagnosticos Comunes',
            path: '/admin/reports/common-diagnosis',
            icon: <FaDiagnoses />
        },
        {
            section: 'Reportes',
            label: 'Generar Reportes (PDF/Excel)',
            path: '/admin/reports/generate',
            icon: <FaFileExport />
        },
        {
            section: 'Estadísticas',
            label: 'Ver Estadísticas',
            path: '/admin/statistics',
            icon: <FaChartPie />
        },
        {
            section: 'Notificaciones',
            label: 'Enviar Notificaciones',
            path: '/admin/notifications/send',
            icon: <FaEnvelopeOpenText />
        },
        {
            section: 'Notificaciones',
            label: 'Solicitudes',
            path: '/admin/notifications/requests',
            icon: <FaInbox />
        },
    ]

    return (
        <Layout menuItems={menuItems} />
    )
}

export default AdminLayout