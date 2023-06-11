import { validators } from 'com'

const { validateId, validateUrl, validateText } = validators

export function createPost(userId, image, text, callback) {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
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

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts/${userId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    const post = { image, text }
    const json = JSON.stringify(post)

    xhr.send(json)
}