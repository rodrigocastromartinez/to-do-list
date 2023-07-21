import { validators } from 'com'
import context from './context'

const { validatePassword } = validators

/**
 * Updates user password
 * @param {string} password current password
 * @param {string} newPassword new password 
 * @param {string} newPasswordConfirm new password confirmation
 * @param {function} callback 
 */

export const updateUserPassword = (password, newPassword, newPasswordConfirm, callback) => {
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ password, newPassword, newPasswordConfirm })
        })

        if (res.status !== 204)
            return res.json().then(({ error: message }) => { throw new Error(message) })
    })()
}