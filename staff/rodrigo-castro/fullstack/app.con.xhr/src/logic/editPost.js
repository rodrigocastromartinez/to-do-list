import { validators } from 'com'
import context from './context'

const { validateId, validateText, validateUrl } = validators

/**
 * Edits an existing post
 * @param {string} postId post id
 * @param {string} image post image - can be the same or change
 * @param {string} text post caption - can be the same or change
 * @param {function} callback 
 */

export default function editPost(postId, image, text, callback) {
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/posts/${postId}/edit`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.setRequestHeader('Authorization', `Bearer ${context.token}`)

        const post = { image, text }
        const json = JSON.stringify(post)

        xhr.send(json)
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/edit`, {
            method: 'PATCH',
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