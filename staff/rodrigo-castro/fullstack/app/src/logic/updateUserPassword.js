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

    if (callback) {
        const xhr = new XMLHttpRequest

        xhr.onload = () => {
            const { status } = xhr

            if (status !== 204) {
                const { response: json } = xhr
                const { error } = JSON.parse(json)

                callback(new Error(error))

                return
            }

            callback(null)
        }

        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.setRequestHeader('Authorization', `Bearer ${context.token}`)

        const data = { password, newPassword, newPasswordConfirm }
        const json = JSON.stringify(data)

        xhr.send(json)
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ password, newPassword, newPasswordConfirm })
        })
            .then(res => {
                if (res.status !== 204)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}