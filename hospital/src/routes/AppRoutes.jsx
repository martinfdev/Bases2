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
        { <Route path='admin/' element={ <PrivateRoute roles={[1]}><AdminLayout /></PrivateRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<NotFound />} />
          <Route path="users/create" element={<NotFound />} />
          <Route path="users/list" element={<NotFound />} />
          <Route path="users/inactive" element={<NotFound />} />
          <Route path="users/modify-space" element={<NotFound />} />
          <Route path="notifications" element={<NotFound />} />
          <Route path="requests" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route> }
  
  
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