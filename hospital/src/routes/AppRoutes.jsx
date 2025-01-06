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
import NewUserRegisterPage from '../pages/admin/NewUserRegisterPage'
import NewAreaPage from '../pages/admin/NewAreaPage'
import AttendedPatientsPage from '../pages/admin/AttendedPatientsPage'
import CommonDiagnosisPage from '../pages/admin/CommonDiagnosisPage'
import DownloadReportsPage from '../pages/admin/DownloadReportsPage'
import PatientDontAreaAsign from '../pages/admin/PatientDontAreaAsign'
import LastIngresedPatientsPage from '../pages/admin/LastIngresedPatientsPage'
import StaticsPage from '../pages/admin/SaticsPage'
import DeveloperLayout from '../layouts/DeveloperLayout'  
import PageDeveloperDashboard from '../pages/dev/DevDashboardPage'
import NewUserRegisterDevPage from '../pages/dev/NewUserRegisterDevPage'
import NewSpecialityDevPage from '../pages/dev/NewSpetialityDevPage'
import ViewSpecialitiesDevPage from '../pages/dev/ViewSpecialitiesDevPage'
import UserViewDev from '../pages/dev/UserViewDev'
// import NewAreaDevPage from '../pages/dev/NewAreaDevPage'
import PatientsViewDevPage from '../pages/dev/PatientsViewDevPage'
import PatientsDontHaveAreaDev  from '../pages/dev/PatientsDontHaveAreaDev'
import ViewAreasPageDev from '../pages/dev/ViewAreasPageDev'
import LastIngresedPatientsDevPage from '../pages/dev/LastIngresedPatientsDevPage'
import LogVitacore from '../components/dev/LogVitacore'
import SettingsPage from '../pages/dev/SettingsPage'
import DoctorLayout from '../layouts/DoctorLayout'
import DocDashboard from '../pages/doc/DocDashboard'
import PatientRecordPage from '../pages/PatientRecordPage'
import PatientsViewDoctorPage from '../pages/doc/PatientsViewDoctorPage'
import ViewPatientRecorPage from '../pages/doc/ViewPatientRecorPage'
import PatientEditRecordPage from '../pages/doc/PatientEditRecordPage'
import ViewAreasDocPage from '../pages/doc/ViewAreasDocPage'
import ViewDischargePatientPAge from '../pages/doc/ViewDischargePatientPAge'
import ViewAssignedPatients from '../pages/doc/ViewAssignedPatients'
import NurseLayout from '../layouts/NurseLayout'
import PatientsViewNursePage from '../pages/nurse/PatientsViewNursePage'
import RegisterNotePage from '../pages/nurse/RegisterNotePage'
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
        <Route path="users/create" element={<NewUserRegisterPage currentUserRole={1} />} />
        <Route path="users/list" element={<UsersView />} />
        <Route path="patients/create" element={<NewPatientPage />} />
        <Route path="patients/list" element={<PatientViewPage />} />
        <Route path="patients/dont-have-area" element={<PatientDontAreaAsign />} />
        <Route path="patients/last-ingresed" element={<LastIngresedPatientsPage />} />
        <Route path="speciality/create" element={<NewSpecialityPage />} />
        <Route path="speciality/list" element={<ViewSpecialityTable />} />
        <Route path="areas/create" element={<NewAreaPage />} />
        <Route path="areas/list" element={<ViewAreasPage />} />
        <Route path="areas/attended/patients" element={<AttendedPatientsPage />} />
        <Route path="logs" element={<LogVitacore />} />
        <Route path="reports/generate" element={<DownloadReportsPage />} />
        <Route path="reports/common-diagnosis" element={<CommonDiagnosisPage />} />
        <Route path="statistics" element={<StaticsPage />} />
        <Route path="notifications/send" element={<NotFound />} />
        <Route path="notifications/requests" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>}

        {/* protectd routes for developer users */}
        <Route path='developer/' element={<PrivateRoute roles={[4]}><DeveloperLayout /></PrivateRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PageDeveloperDashboard />} />
        <Route path="logs" element={<LogVitacore />} />
        <Route path="users/create" element={<NewUserRegisterDevPage currentUserRole={4} />} />
        <Route path="users/list" element={<UserViewDev />} />
        <Route path="speciality/create" element={<NewSpecialityDevPage />} />
        <Route path="speciality/view" element={<ViewSpecialitiesDevPage />} />
        {/* <Route path="areas/create" element={<NewAreaDevPage />} /> */}
        <Route path="patients/list" element={<PatientsViewDevPage />} />
        <Route path="patients/dont-have-area" element={<PatientsDontHaveAreaDev />} />
        <Route path="patients/last-ingresed" element={<LastIngresedPatientsDevPage />} />
        <Route path="areas/list" element={<ViewAreasPageDev />} />
        <Route path="records/view" element={<NotFound />} />
        <Route path="records/edit" element={<NotFound />} />
        <Route path="settings" element={< SettingsPage/>} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* protected routes for doctor users */}
      <Route path='doctor/' element={<PrivateRoute roles={[2]}><DoctorLayout /></PrivateRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DocDashboard />} />
        <Route path="records/view" element={<ViewPatientRecorPage />} />
        <Route path="records/create" element={<PatientRecordPage />} />
        <Route path="records/edit" element={<PatientEditRecordPage />} />
        <Route path="patients/list" element={<ViewAssignedPatients />} />
        <Route path="patients/discharge" element={<ViewDischargePatientPAge />} />
        <Route path="areas/view" element={<ViewAreasDocPage />} />
        <Route path="areas/assign" element={<PatientsViewDoctorPage />} />
        <Route path="notifications" element={<NotFound />} />
        <Route path="reports/patient" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/*protected routes for nurse users */}
      <Route path='nurse/' element={<PrivateRoute roles={[3]}><NurseLayout /></PrivateRoute>}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<NotFound />} />
      <Route path="records/view" element={<ViewPatientRecorPage />} />
      <Route path="records/edit" element={<PatientEditRecordPage />} />
      <Route path="records/create" element={<PatientRecordPage />} />
      <Route path="patients/assign" element={<NotFound />} />
      <Route path="patients/list" element={<PatientsViewNursePage />} />
      <Route path="patients/notes" element={<RegisterNotePage />} />
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