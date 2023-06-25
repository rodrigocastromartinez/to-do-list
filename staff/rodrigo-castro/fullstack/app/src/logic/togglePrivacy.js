import { validators } from 'com'

const { validateId } = validators

/**
 * Toggles post privacy
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @param {function} callback 
 */

export default function togglePrivacy(userId, postId, callback) {
    validateId(userId)
    validateId(postId)

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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/privacy`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)


    xhr.send()
}