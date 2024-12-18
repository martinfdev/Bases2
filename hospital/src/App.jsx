import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/AppRoutes'
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
