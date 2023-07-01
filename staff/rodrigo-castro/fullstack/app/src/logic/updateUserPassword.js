// import { validateId, validatePassword } from './helpers/validators'
import { validators } from 'com'

const { validateToken, validatePassword } = validators

/**
 * Updates user password
 * @param {string} token user id
 * @param {string} password current password
 * @param {string} newPassword new password 
 * @param {string} newPasswordConfirm new password confirmation
 * @param {function} callback 
 */

export const changePassword = (token, password, newPassword, newPasswordConfirm, callback) => {
    validateToken(token)
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

        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = { password, newPassword, newPasswordConfirm }
        const json = JSON.stringify(data)

        xhr.send(json)
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password, newPassword, newPasswordConfirm })
        })
            .then(res => {
                if (res.status !== 204)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}