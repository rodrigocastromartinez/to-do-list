import context from './context'

/**
 * Retrieves all posts
 * @param {function} callback 
 * @returns {array} an array of objects with all the posts found
 */

export default function retrievePosts() {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/retrieveall`, {
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