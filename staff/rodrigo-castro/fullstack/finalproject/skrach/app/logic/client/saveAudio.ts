import context from './context'

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} userId user's id or token
 * @param {string} image url of the image
 * @param {string} text image caption
 * @param {function} callback 
 */

export function saveAudio(formData: FormData, projectId: string, trackId: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tracks/${trackId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: formData,
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}