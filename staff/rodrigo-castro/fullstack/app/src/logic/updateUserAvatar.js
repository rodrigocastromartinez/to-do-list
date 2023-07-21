import { validators } from 'com'
import context from './context'

const { validateUrl } = validators

/**
 * Updates user avatar
 * @param {string} avatar avatar url
 * @param {function} callback 
 */

export const updateUserAvatar = (avatar) => {
    validateUrl(avatar, 'Avatar url')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ avatar })
        })

        if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
    })()
}