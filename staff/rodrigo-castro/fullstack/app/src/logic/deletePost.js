import { validators } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a post (from its owner) identified by it's id
 * @param {string} userId post owner's id
 * @param {string} postId post's id
 * @param {function} callback 
 */

export default function deletePost(postId) {
    validateId(postId)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })
    })()
}