console.debug('load register user')
import { validators } from 'com'

const { validateUserName, validateEmail, validatePassword } = validators

export default function registerUser(email, name, password, callback) {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

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

    const user = { name, email, password }
    const json = JSON.stringify(user)

    xhr.send(json)
}