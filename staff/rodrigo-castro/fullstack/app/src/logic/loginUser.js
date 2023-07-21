import { validators } from 'com'
import context from './context'

const { validateEmail, validatePassword } = validators

/**
 * Authenticates a user by email and password
 * @param {string} email user's email
 * @param {string} password user's password
 * @returns {string} user's id
 */

export default function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (res.status !== 200){
            const { message } = await res.json()

            throw new Error(message)
        }
        
        context.token = await res.json()
    })()
}