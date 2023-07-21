import { validators } from 'com'
import context from './context'

const { validateToken } = validators

/**
 * Retrieves user saved posts
 * @param {*} userId user id
 * @param {*} callback 
 */

export default function retrieveSavedPosts() {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/saved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 200) {
            const { message } = await res.json()

            throw new Error(message)
        }

        return await res.json()
    })()
}