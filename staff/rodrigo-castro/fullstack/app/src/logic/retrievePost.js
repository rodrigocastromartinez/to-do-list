import { validators } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Retrieves a specific post
 * @param {string} userId post owner's id
 * @param {string} postId post id
 * @param {function} callback 
 * @returns {object} the found post
 */

export default function retrievePost(postId) {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/retrievepost`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 200){
            const { message } = await res.json()

            throw new Error (message)
        }

        return await res.json()
    })()
}