// import { validateId } from "./helpers/validators"
import { loadPosts, savePosts, findUserById, findPostById } from "../data"
import { validators } from 'com'

const { validateId } = validators

export default function deletePost(userId, postId, callback) {
    validateId(userId)
    validateId(postId)

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

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    xhr.send()
}