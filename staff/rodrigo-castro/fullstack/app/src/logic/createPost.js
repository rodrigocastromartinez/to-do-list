import { validators } from 'com'
import context from './context'

const { validateUrl, validateText } = validators

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} userId user's id or token
 * @param {string} image url of the image
 * @param {string} text image caption
 * @param {function} callback 
 */

export function createPost(image, text) {
    validateUrl(image)
    validateText(text)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: 'POST',
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