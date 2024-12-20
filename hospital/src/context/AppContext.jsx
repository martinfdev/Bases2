import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import NotificationModal from '../components/notifications/NotificationModal'

// create el Contexto
export const AppContext = createContext(undefined)

// context provider
export const AppProvider = ({ children }) => {
  // theme state
  const [theme, setTheme] = useState('light')

  // notification state
  const [notification, setNotification] = useState(null)

  // change theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  // add notification function
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
    }
    setNotification(newNotification)

    // remove notification after 3 seconds
    setTimeout(() => {
      removeNotification()
    }, 3000)
  }

  // remove notification function
  const removeNotification = () => {
    setNotification(null)
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        notification,
        addNotification,
        removeNotification,
      }}
    >
      {children}
      {notification && (
        <NotificationModal notification={notification} onClose={removeNotification} />
      )}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
