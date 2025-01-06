import { useState, useEffect } from 'react'
import { getExpireCollegiate } from '../../services/doctorService'
import { getUserData } from '../../services/authUserService'
import { sendEmail } from '../../services/emailService'
import Waiting from '../../components/shared/Waiting'

const StatusExpireSendMail = () => {
  const [expireCollegiate, setExpireCollegiate] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData()
        setUserData(data)
      } catch (error) {
        console.error('Error al obtener datos de usuario:', error)
        setError(error)
      }
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchExpireCollegiate = async () => {
      try {
        const data = await getExpireCollegiate()
        setExpireCollegiate(data)

        if (data.dias_restantes <= 30) {
          handleSendEmail()
        }
      } catch (error) {
        console.error('Error al obtener expiración de registro:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchExpireCollegiate()
  }, [userData])

  const handleSendEmail = async () => {
    if (!userData) return

    try {
      const emailData = {
        to: userData.correo,
        nombre: userData.nombres,
        fecha_vencimiento: userData.fecha_vencimiento_colegiado,
      }
      await sendEmail(emailData)
    } catch (error) {
      console.error('Error al enviar correo:', error)
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Estado de Vencimiento de Registro</h1>
      {loading && <Waiting />}
      {error && <p className="text-red-500">Error al obtener datos: {error.message}</p>}
      {expireCollegiate && (
        <div className="p-4 bg-white shadow-md rounded">
          <p className="text-lg">Días restantes para vencimiento: {expireCollegiate.dias_restantes}</p>
        </div>
      )}
    </div>
  )
}

export default StatusExpireSendMail
