import { validators } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Adds or removes user id from the likes list of the post
 * @param {string} postId post's id
 * @param {function} callback 
 */

export default (postId) => {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/like`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 201) {
            const { message } = await res.json()

            throw new Error(message)
        }
    })()
}