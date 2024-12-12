import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../pages/LoginPage'
import AdminLayout from '../layouts/AdminLayout'
import NotFound from '../pages/NotFound'


const AppRouter = () => {
    return (
      <Routes>
        {/* routes global for all users */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
          
        {/* Rutas Protegidas para Admin */}
        {/* <Route path='/admin' element={<PrivateRoute roles={[1]} children={<AdminLayout />} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Reports />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/list" element={<ListUsers />} />
          <Route path="users/inactive" element={<InactiveUsers />} />
          <Route path="users/modify-space" element={<ModifySpace />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="requests" element={<ListRequest />} />
          <Route path="*" element={<NotFound />} />
        </Route> */}
  
  
        {/* Rutas Protegidas para Empleados y Clientes */}
        {/* <Route path='client/' element={<PrivateRoute roles={[2, 3]} children={<ClientLayout />} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path='dashboard' element={< ClientDashboard />}/>
          <Route path='files' element={<Files />} />
          <Route path='shared' element={<SharedWithMe />}/>
          <Route path='recent' element={<Recent />}/>
          <Route path='favorites' element={<Favorites />}/> 
          <Route path='trash' element={<Trash />} /> 
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings/>} />
          <Route path='backup' element={<Backup />} />
          <Route path="*" element={<NotFound />} />
        </Route> */}
  
        {/* Ruta de No Autorizado */}
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
  
        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }
  
  export default AppRouter