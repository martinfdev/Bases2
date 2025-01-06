const API_URL = import.meta.env.VITE_BASE_EMAIL_URL


/**
 * send an email to the user
 * @param emailData - object containing the email data
 * @returns a promise that resolves to the email data if the creation is successful
 * @throws an error if the creation fails
 */
export const sendEmail = async (emailData) => {
    try {
        // const response = await fetch(`${API_URL}/send-email`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(emailData),
        // })
        // const data = await response.json()
        // if (!response.ok) {
        //     throw new Error(data.error || 'Error en el envío del correo.')
        // }
        console.log('emailData to send:', emailData)
        // return data
    } catch (error) {
        console.error('Error en envío de correo:', error)
        throw error
    }
}


