import {
  FaTachometerAlt, FaUserCog, FaUserFriends, FaUserSlash,
  FaMapMarkedAlt, FaMap, FaUserTag, FaClipboardList,
  FaFileExport, FaChartPie, FaEnvelopeOpenText, FaInbox
} from 'react-icons/fa'
import  Layout  from '../layouts/Layout'


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
      {
          section: 'Gestión de Usuarios',
          label: 'Usuarios Inactivos',
          path: '/admin/users/inactive',
          icon: <FaUserSlash />
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
          label: 'Asignar Pacientes',
          path: '/admin/areas/assign',
          icon: <FaUserTag />
      },
      {
          section: 'Bitácora del Sistema',
          label: 'Visualizar Bitácora',
          path: '/admin/logs',
          icon: <FaClipboardList />
      },
      {
          section: 'Reportes',
          label: 'Generar Reportes (PDF/Excel)',
          path: '/admin/reports',
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