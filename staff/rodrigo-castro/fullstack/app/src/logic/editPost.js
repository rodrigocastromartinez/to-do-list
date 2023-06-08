// import { validateId, validateText, validateUrl } from "./helpers/validators"
import { findPostById, findUserById, savePost } from "../data"
import { validators } from 'com'

const { validateId, validateText, validateUrl } = validators

export default function editPost(userId, postId, image, text, callback) {
    // const post = retrievePost(userId, postId)

    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            if (userId !== post.author) {
                callback(new Error(`Post doesn't belong to this user`))

                return
            }

            post.image = image
            post.date = new Date
            post.text = text

            savePost(post, () => callback(null))
        })
    })
}