console.debug('load register user')
import { validators } from '../../../com/index'

const { validateUserName, validateEmail, validatePassword } = validators

/**
 * Registers a new user
 * @param {string} email user's email
 * @param {string} name username
 * @param {string} password user's password
 * @param {function} callback 
 */

export default function registerUser(email : string, name : string, password : string) {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    

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