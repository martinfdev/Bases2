import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

/**
 * Custom hook to use the AppContext
 * @returns {AppContextProps} AppContext
 * @throws {Error} if the hook is used outside of the AppProvider
 */

const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider')
  }
  return context
}

export default useAppContext