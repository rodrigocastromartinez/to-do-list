console.debug('load register user')
import { validators } from '../../com/index'

const { validateUserName, validateEmail, validatePassword } = validators

/**
 * Registers a new user
 * @param {string} email user's email
 * @param {string} name username
 * @param {string} password user's password
 */

export default function registerUser(email : string, name : string, password : string) {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const res = await fetch(`${process.env.URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        if(res.status === 201)
            return

        const { message } = await res.json()

        throw new Error(message)
    })()
}