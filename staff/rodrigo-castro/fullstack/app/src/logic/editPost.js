import { validators } from 'com'

const { validateId, validateText, validateUrl, validateToken } = validators

/**
 * Edits an existing post
 * @param {string} token post owner's token
 * @param {string} postId post id
 * @param {string} image post image - can be the same or change
 * @param {string} text post caption - can be the same or change
 * @param {function} callback 
 */

export default function editPost(token, postId, image, text, callback) {
    validateToken(token, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

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

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const post = { image, text }
    const json = JSON.stringify(post)

    xhr.send(json)
}