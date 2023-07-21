import { validators } from 'com'
import context from './context'

const { validateUrl, validateText } = validators

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} userId user's id or token
 * @param {string} image url of the image
 * @param {string} text image caption
 * @param {function} callback 
 */

export function createPost(image, text, callback) {
    validateUrl(image)
    validateText(text)

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

            callback(null)
        }

        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.setRequestHeader('Authorization', `Bearer ${context.token}`)

        const post = { image, text }
        const json = JSON.stringify(post)

        xhr.send(json)

    } else
        return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ image, text })
        })
            .then(res => {
                if (res.status !== 200)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}