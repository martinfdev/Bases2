import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  )
}

export default App
