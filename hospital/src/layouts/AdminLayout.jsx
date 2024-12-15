import {Outlet} from 'react-router-dom'
import { FaHome, FaUsers, FaUserPlus, FaList, FaChartBar, FaBell, FaListUl } from 'react-icons/fa'
import Sidebar from '../components/shared/Sidebar'

const AdminLayout = () => {

    const menuItems = [
      {
        section: null,
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <FaHome />,
      },
      {
        section: 'Gestión de Usuarios',
        label: 'Crear Empleado/Cliente',
        path: '/admin/users/create',
        icon: <FaUserPlus />,
      },
      {
        section: 'Gestión de Usuarios',
        label: 'Listar Usuarios',
        path: '/admin/users/list',
        icon: <FaList />,
      },
      {
        section: 'Gestión de Usuarios',
        label: 'Usuarios Inactivos',
        path: '/admin/users/inactive',
        icon: <FaUsers />,
      },
      {
        section: 'Configuraciones de Cuenta',
        label: 'Modificar Espacio',
        path: '/admin/users/modify-space',
        icon: <FaChartBar />,
      },
      {
        section: 'Notificaciones',
        label: 'Enviar Notificaciones',
        path: '/admin/notifications',
        icon: <FaBell />,
      },
      {
        section: 'Notificaciones',
        label: 'Solicitudes',
        path: '/admin/requests', 
        icon: <FaListUl />,
      }
    ]
  
  
    return (
      <div className="flex h-screen">
  <Sidebar menuItems={menuItems} />
  <div className="flex-1 flex flex-col">
    <main className="flex-1 p-6 bg-gray-100 overflow-auto">
      <Outlet />
    </main>
    <footer className="w-full">
      {/* <Footer /> */}
    </footer>
  </div>
</div>

    )
  }
  
  export default AdminLayout