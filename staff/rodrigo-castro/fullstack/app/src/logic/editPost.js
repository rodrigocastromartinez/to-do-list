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

export default function editPost(postId, image, text) {
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ image, text })
        })

        if (res.status !== 200)
            return res.json().then(({ error: message }) => { throw new Error(message) })        
    })()
}