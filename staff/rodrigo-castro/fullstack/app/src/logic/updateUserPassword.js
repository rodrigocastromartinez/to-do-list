// import { validateId, validatePassword } from './helpers/validators'
import { validators } from 'com'

const { validateId, validatePassword } = validators

/**
 * Updates user password
 * @param {string} userId user id
 * @param {string} password current password
 * @param {string} newPassword new password 
 * @param {string} newPasswordConfirm new password confirmation
 * @param {function} callback 
 */

export const changePassword = (userId, password, newPassword, newPasswordConfirm, callback) => {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

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

    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const data = { password, newPassword, newPasswordConfirm }
    const json = JSON.stringify(data)

    xhr.send(json)
}