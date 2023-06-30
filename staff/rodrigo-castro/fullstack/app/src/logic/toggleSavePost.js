import { validators } from 'com'

const { validateToken, validateId } = validators

/**
 * Adds or removes post id from the favourites list of the post
 * @param {string} token user's id
 * @param {string} postId post's id
 * @param {function} callback 
 */

export default (token, postId, callback) => {
    validateToken(token, 'token')
    validateId(postId, 'post id')

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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/save/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}