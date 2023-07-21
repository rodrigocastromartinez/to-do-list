console.debug('load register user')
import { validators } from 'com'

const { validateUserName, validateEmail, validatePassword } = validators

/**
 * Registers a new user
 * @param {string} email user's email
 * @param {string} name username
 * @param {string} password user's password
 * @param {function} callback 
 */

export default function registerUser(email, name, password) {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        if(res.status === 201)
            return

        const { message } = await res.json()

        throw new Error(message)
    })()
}