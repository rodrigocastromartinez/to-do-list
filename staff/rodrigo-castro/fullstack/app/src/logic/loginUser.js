import { validators } from 'com'
import context from './context'

const { validateEmail, validatePassword } = validators

/**
 * Authenticates a user by email and password
 * @param {string} email user's email
 * @param {string} password user's password
 * @returns {string} user's id
 */

export default function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)

    if (callback) {
        const xhr = new XMLHttpRequest

        xhr.onload = () => {
            const { status } = xhr

            if (status !== 200) {
                const { response: json } = xhr
                const { error } = JSON.parse(json)

                callback(new Error(error))

                return
            }

            const { response: json } = xhr
            const token = JSON.parse(json)

            callback(null, token)
        }

        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        const user = { email, password }
        const json = JSON.stringify(user)

        xhr.send(json)
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users/auth`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(res => {
                if (res.status !== 200)
                    return res.json().then(({ error: message }) => { throw new Error(message) })

                return res.json()
            })
            .then(token => {
                context.token = token
            })
}