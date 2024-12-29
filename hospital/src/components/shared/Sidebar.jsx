import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaBars, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'
import SidebarLink from './SidebarLink'

const Sidebar = ({ menuItems }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)  
    const [openSections, setOpenSections] = useState({})

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const nameRol = (id_rol) => {
        if (id_rol === 0) {
            return 'Desarrollador'
        } else if (id_rol === 1) {
            return 'Administrador'
        } else if (id_rol === 2) {
            return 'Doctor'
        } else if (id_rol === 3) {
            return 'Enfermera'
        } else {
            return 'Desarrollador'
        }
    }

    const filteredMenuItems = menuItems
    const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
        const section = item.section || 'default'
        if (!acc[section]) {
            acc[section] = []
        }
        acc[section].push(item)
        return acc
    }, {})

    const toggleSection = (sectionName) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionName]: !prev[sectionName],
        }))
    }

    return (
        <>
            <button
                className="md:hidden p-4 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaBars size={24} />
            </button>

            <aside
                className={`top-0 left-0 h-full w-64 bg-white shadow-md transform 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    transition-transform duration-300 ease-in-out 
                    md:translate-x-0 md:static md:shadow-none`}
            >
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-center">
                        {nameRol(user.id_rol)}
                    </h1>
                </div>
                
                <nav className="mt-10 px-4 drop-shadow-lg">
                    {Object.entries(groupedMenuItems).map(([section, items]) => {
                        const isSectionOpen = openSections[section] ?? false

                        return (
                            <div key={section}>
                                {section !== 'default' && (
                                    <button
                                        onClick={() => toggleSection(section)}
                                        className="
                                            mt-4 px-4 text-gray-700 font-semibold 
                                            flex items-center justify-between w-full
                                        "
                                    >
                                        <span>{section}</span>
                                        {isSectionOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                )}
                                {section === 'default' ? (
                                    items.map((item) => (
                                        <SidebarLink
                                            key={item.path}
                                            to={item.path}
                                            icon={item.icon}
                                            label={item.label}
                                        />
                                    ))
                                ) : (
                                    isSectionOpen && (
                                        <div className="ml-4">
                                            {items.map((item) => (
                                                <SidebarLink
                                                    key={item.path}
                                                    to={item.path}
                                                    icon={item.icon}
                                                    label={item.label}
                                                />
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>
                        )
                    })}

                    <div className="mt-10">
                        <button
                            onClick={handleLogout}
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200 w-full"
                        >
                            <FaSignOutAlt className="mr-3" />
                            Cerrar Sesión
                        </button>
                    </div>
                </nav>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    )
}

Sidebar.propTypes = {
    menuItems: PropTypes.array.isRequired
}

export default Sidebar