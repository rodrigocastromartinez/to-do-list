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

export default function registerUser(email, name, password, callback) {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    if (callback) {
        const xhr = new XMLHttpRequest

        xhr.onload = () => {
            const { status } = xhr

            if (status !== 201) {
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

        xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        const user = { name, email, password }
        const json = JSON.stringify(user)

        xhr.send(json)
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => {
                if (res.status !== 201)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}