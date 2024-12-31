import { useEffect, useState } from 'react'
import PropsTypes from 'prop-types'
import { getSpecialties, registerUser } from '../../services/adminServices'
import NewUserForm from '../../components/forms/NewUserForm'
import Waiting from '../../components/shared/Waiting'
import useAppContext from '../../hooks/useAppContext'

const NewUserRegisterPage = ({ currentUserRole }) => {
    const [specialities, setSpecialities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { addNotification } = useAppContext()

    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const response = await getSpecialties()
                setSpecialities(response.especialidades)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError('Ocurrió un error al intentar obtener los datos')
            }
        }
        fetchSpecialities()
    }, [])

    const handleRegisterUser = async (user) => {
        setLoading(true)
        try {
            await registerUser(user)
            addNotification({
                type: 'success',
                message: 'Usuario registrado correctamente'
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
            addNotification('Ocurrió un error al intentar registrar el usuario', 'error')
        }
    }

    return (
        <>
            {loading ? (
                <Waiting />
            ) : (
                <div>
                    {error && <p className="text-red-500">{error}</p>}
                    <NewUserForm
                        currentUserRole={currentUserRole}
                        listSpecialities={specialities}
                        registerUser={handleRegisterUser}
                    />
                </div>
            )}
        </>
    )
}

NewUserRegisterPage.propTypes = {
    currentUserRole: PropsTypes.number.isRequired
}

export default NewUserRegisterPage