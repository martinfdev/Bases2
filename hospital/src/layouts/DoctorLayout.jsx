import {FaStethoscope, FaBookMedical, FaUserMd, FaEdit, FaHospital, FaUserCheck, FaEnvelope, FaFileMedicalAlt } from 'react-icons/fa'
import Layout from './Layout'

const DoctorLayout = () => {

    const doctorMenuItems = [
        {
          section: null,
          label: 'Dashboard',
          path: '/doctor/dashboard',
          icon: <FaStethoscope />,
        },
        {
          section: 'Expedientes Médicos',
          label: 'Ver Expedientes',
          path: '/doctor/records/view',
          icon: <FaBookMedical />,
        },
        {
          section: 'Expedientes Médicos',
          label: 'Crear Expediente',
          path: '/doctor/records/create',
          icon: <FaUserMd />,
        },
        {
          section: 'Expedientes Médicos',
          label: 'Editar Expediente',
          path: '/doctor/records/edit',
          icon: <FaEdit />,
        },
        {
          section: 'Áreas Hospitalarias',
          label: 'Ver Áreas',
          path: '/doctor/areas',
          icon: <FaHospital />,
        },
        {
          section: 'Áreas Hospitalarias',
          label: 'Asignar Pacientes',
          path: '/doctor/areas/assign',
          icon: <FaUserCheck />,
        },
        {
          section: 'Notificaciones',
          label: 'Ver Notificaciones',
          path: '/doctor/notifications',
          icon: <FaEnvelope />,
        },
        {
          section: 'Reportes de Paciente',
          label: 'Generar Reporte (PDF)',
          path: '/doctor/reports/patient',
          icon: <FaFileMedicalAlt />,
        },
      ]
      
    return (
      <Layout menuItems={doctorMenuItems} />
    )
  }
  
  export default DoctorLayout
  

  