import { validators } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Adds or removes post id from the favourites list of the post
 * @param {string} postId post's id
 * @param {function} callback 
 */

export default (postId, callback) => {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/save/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 201){
            const { message } = await res.json()

            throw new Error(message)
        }
    })()
}