console.debug('load retrieve user')

import { validators } from 'com'

const { validateToken } = validators

/**
 * Retrieves the found user
 * @param {string} token user's token
 * @param {function} callback 
 * @returns {object} user found
 */

export const retrieveUser = (token, callback) => {
    validateToken(token, 'token')

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
            const user = JSON.parse(json)

            callback(null, user)
        }

        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/retrieveuser`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        xhr.send()
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users/retrieveuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status !== 200)
                    return res.json().then(({ error: message }) => { throw new Error(message) })

                return res.json()
            })
}