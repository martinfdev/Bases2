import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const SidebarLink = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200 ${
          isActive ? 'bg-gray-300' : ''
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  )
}

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
}

export default SidebarLink