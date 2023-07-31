console.debug('load retrieve user')

import context from './context'

/**
 * Retrieves the found user
 * @param {string} token user's token
 * @param {function} callback 
 * @returns {object} user found
 */

export const retrieveUser = () => {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/users/retrieveuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return await res.json()
    })()
}