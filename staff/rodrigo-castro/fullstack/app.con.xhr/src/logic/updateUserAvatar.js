import { validators } from 'com'
import context from './context'

const { validateUrl } = validators

/**
 * Updates user avatar
 * @param {string} avatar avatar url
 * @param {function} callback 
 */

export const updateUserAvatar = (avatar, callback) => {
    validateUrl(avatar, 'Avatar url')

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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/avatar`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.setRequestHeader('Authorization', `Bearer ${context.token}`)

        const data = { avatar }
        const json = JSON.stringify(data)

        xhr.send(json)
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ avatar })
        })
            .then(res => {
                if (res.status !== 204)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}