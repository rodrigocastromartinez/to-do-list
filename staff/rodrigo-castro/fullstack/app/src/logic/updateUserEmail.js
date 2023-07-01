import { validators } from 'com'

const { validateEmail, validateToken, validatePassword } = validators

/**
 * Updates user email
 * @param {string} token user token
 * @param {string} email current user email
 * @param {string} newEmail new email
 * @param {string} password user password
 * @param {function} callback 
 */

export const changeEmail = (token, email, newEmail, password, callback) => {
    validateToken(token)
    validateEmail(email)
    validateEmail(newEmail)
    validatePassword(password)

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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/email`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = { email, newEmail, password }
        const json = JSON.stringify(data)

        xhr.send(json)
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users/email`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email, newEmail, password })
        })
            .then(res => {
                if (res.status !== 204)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}