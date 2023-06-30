import { validators } from 'com'

const { validateId, validateToken } = validators

/**
 * Deletes a post (from its owner) identified by it's id
 * @param {string} userId post owner's id
 * @param {string} postId post's id
 * @param {function} callback 
 */

export default function deletePost(token, postId, callback) {
    validateToken(token)
    validateId(postId)

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

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}