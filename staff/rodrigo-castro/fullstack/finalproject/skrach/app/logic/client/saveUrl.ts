import context from './context'

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} url track url
 * @param {string} projectId project id
 * @param {string} trackId track id
 */

export default function saveUrl(url: string, projectId: string, trackId: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tracks/${trackId}/url`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ url })
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}