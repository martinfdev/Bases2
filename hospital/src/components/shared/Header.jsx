import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


function Header() {
    const { user} = useAuth()

    // const typeUser = (id_rol) => {
    //     if (id_rol === 0) {
    //         return 'Desarrollador'
    //     }
    //     else if (id_rol === 1) {
    //         return 'Administrador'
    //     } else if (id_rol === 2) {
    //         return 'Doctor'
    //     } else if (id_rol === 3) {
    //         return 'Enfermeria'
    //     } else {
    //         return 'Developer'
    //     }
    // }

    return (
        <header className="bg-gray-200 text-gray-700">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/">
                    <h1 className="text-2xl font-bold">Hospital BD2</h1>
                    {/* <h2 className="text-xl">{typeUser(user.id_rol)}</h2> */}
                    <h2 className="text-sm">{"Sistema Version 1.0.0"}</h2>
                </Link>
                <nav className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span>Hola, {user.nombres}</span>
                            <div className='h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center'>
                                <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="6" r="4" fill="#1C274C" />
                                    <path opacity="0.5" d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="#1C274C" />
                                </svg>
                            </div>
                        </>

                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Registrarse
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header