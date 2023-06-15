import { validators } from 'com'

const { validateId } = validators

export default (userId, postId, callback) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 201) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/save/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    xhr.send()
}