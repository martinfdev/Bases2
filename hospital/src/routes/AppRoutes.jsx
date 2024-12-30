import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../pages/LoginPage'
import AdminLayout from '../layouts/AdminLayout'
import PageAdminDashboard from '../pages/admin/PageAdminDashboard'
import UsersView from '../pages/admin/UserView'
import NewPatientPage from '../pages/admin/NewPatientPage'
import PatientViewPage from '../pages/admin/PatientViewPage'
import NewSpecialityPage from '../pages/admin/NewSpecialityPage'
import ViewSpecialityTable from '../pages/admin/ViewSpecialityTable'
import ViewAreasPage from '../pages/admin/ViewAreasPage'
import NewAreaPage from '../pages/admin/NewAreaPage'
import AttendedPatientsPage from '../pages/admin/AttendedPatientsPage'
import CommonDiagnosisPage from '../pages/admin/CommonDiagnosisPage'
import DownloadReportsPage from '../pages/admin/DownloadReportsPage'
import PatientDontAreaAsign from '../pages/admin/PatientDontAreaAsign'
import DeveloperLayout from '../layouts/DeveloperLayout'  
import PageDeveloperDashboard from '../pages/dev/DevDashboardPage'
import LogVitacore from '../components/dev/LogVitacore'
import DoctorLayout from '../layouts/DoctorLayout'
import PatientRecordPage from '../pages/PatientRecordPage'
import NurseLayout from '../layouts/NurseLayout'
import NewUserForm from '../components/admin/NewUserForm'
import NotFound from '../pages/NotFound'
import Unauthorized from '../pages/Unauthorized'

const AppRouter = () => {

  return (
    <Routes>
      {/* routes global for all users */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* protected routes for admin users */}
      {<Route path='admin/' element={<PrivateRoute roles={[1]}><AdminLayout /></PrivateRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PageAdminDashboard />} />
        <Route path="users/create" element={<NewUserForm currentUserRole={1} />} />
        <Route path="users/list" element={<UsersView />} />
        <Route path="users/inactive" element={<NotFound />} />
        <Route path="patients/create" element={<NewPatientPage />} />
        <Route path="patients/list" element={<PatientViewPage />} />
        <Route path="patients/dont-have-area" element={<PatientDontAreaAsign />} />
        <Route path="speciality/create" element={<NewSpecialityPage />} />
        <Route path="speciality/list" element={<ViewSpecialityTable />} />
        <Route path="areas/create" element={<NewAreaPage />} />
        <Route path="areas/list" element={<ViewAreasPage />} />
        <Route path="areas/attended/patients" element={<AttendedPatientsPage />} />
        <Route path="logs" element={<LogVitacore />} />
        <Route path="reports/generate" element={<DownloadReportsPage />} />
        <Route path="reports/common-diagnosis" element={<CommonDiagnosisPage />} />
        <Route path="statistics" element={<NotFound />} />
        <Route path="notifications/send" element={<NotFound />} />
        <Route path="notifications/requests" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>}

        {/* protectd routes for developer users */}
        <Route path='developer/' element={<PrivateRoute roles={[4]}><DeveloperLayout /></PrivateRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PageDeveloperDashboard />} />
        <Route path="logs" element={<LogVitacore />} />
        <Route path="users/create" element={<NewUserForm currentUserRole={4} />} />
        <Route path="records/view" element={<NotFound />} />
        <Route path="records/edit" element={<NotFound />} />
        <Route path="settings" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* protected routes for doctor users */}
      <Route path='doctor/' element={<PrivateRoute roles={[2]}><DoctorLayout /></PrivateRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<NotFound />} />
        <Route path="records/view" element={<NotFound />} />
        <Route path="records/create" element={<PatientRecordPage />} />
        <Route path="records/edit" element={<NotFound />} />
        <Route path="areas" element={<NotFound />} />
        <Route path="areas/assign" element={<NotFound />} />
        <Route path="notifications" element={<NotFound />} />
        <Route path="reports/patient" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/*protected routes for nurse users */}
      <Route path='nurse/' element={<PrivateRoute roles={[3]}><NurseLayout /></PrivateRoute>}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<NotFound />} />
      <Route path="patients/list" element={<NotFound />} />
      <Route path="patients/notes" element={<NotFound />} />
      <Route path="patients/location" element={<NotFound />} />
      <Route path="notifications" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Route>

      {/* route for unauthorized users */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter