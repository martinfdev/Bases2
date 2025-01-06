import {FaHeartbeat, FaProcedures, FaNotesMedical, FaMapSigns, FaCommentMedical, FaBookMedical, FaUserMd, FaEdit} from 'react-icons/fa'
import Layout from "./Layout"

const NurseLayout = () => {

     const nurseMenuItems = [
        {
          section: null,
          label: 'Dashboard',
          path: '/nurse/dashboard',
          icon: <FaHeartbeat />,
        },
       {
         section: 'Expedientes Médicos',
         label: 'Ver Expedientes',
         path: '/nurse/records/view',
         icon: <FaBookMedical />,
       },
       {
         section: 'Expedientes Médicos',
         label: 'Crear Expediente',
         path: '/nurse/records/create',
         icon: <FaUserMd />,
       },
       {
         section: 'Expedientes Médicos',
         label: 'Editar Expediente',
         path: '/nurse/records/edit',
         icon: <FaEdit />,
       },
       {
          section: 'Pacientes',
          label: 'Listado de Pacientes',
          path: '/nurse/patients/list',
          icon: <FaProcedures />,
        },
        {
          section: 'Pacientes',
          label: 'Registrar Notas de Cuidado',
          path: '/nurse/patients/notes',
          icon: <FaNotesMedical />,
        },
        {
          section: 'Ubicación',
          label: 'Consultar Ubicación de Pacientes',
          path: '/nurse/patients/location',
          icon: <FaMapSigns />,
        },
        {
          section: 'Notificaciones',
          label: 'Ver Notificaciones',
          path: '/nurse/notifications',
          icon: <FaCommentMedical />,
        },
      ]
      
    return (
        <Layout menuItems={nurseMenuItems} />
    )
}

export default NurseLayout