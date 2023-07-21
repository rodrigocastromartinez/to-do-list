import { validators } from 'com'
import context from './context'

const { validateEmail, validatePassword } = validators

/**
 * Updates user email
 * @param {string} email current user email
 * @param {string} newEmail new email
 * @param {string} password user password
 * @param {function} callback 
 */

export const changeEmail = (email, newEmail, password) => {
    validateEmail(email)
    validateEmail(newEmail)
    validatePassword(password)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/email`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ email, newEmail, password })
        })

        if (res.status !== 204)
            return res.json().then(({ error: message }) => { throw new Error(message) })
    })()
}