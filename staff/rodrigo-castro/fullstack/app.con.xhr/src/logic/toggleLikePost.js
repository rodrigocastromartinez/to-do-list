import { validators } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Adds or removes user id from the likes list of the post
 * @param {string} postId post's id
 * @param {function} callback 
 */

export default (postId, callback) => {
    validateId(postId, 'post id')

    if (callback) {
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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/like`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.setRequestHeader('Authorization', `Bearer ${context.token}`)

        xhr.send()
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/like`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })
            .then(res => {
                if (res.status !== 201)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}