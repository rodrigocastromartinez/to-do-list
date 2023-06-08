// import { validateId } from "./helpers/validators"
import { findUserById, findPostById } from "../data"
import { validators } from 'com'

const { validateId } = validators

export default function retrievePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    findUserById(userId, foundUser => {
        if (!foundUser) {
            callback(new Error('User id not valid'))
        }

        findPostById(postId, foundPost => {
            if (!foundPost) {
                callback(new Error('Post id not valid'))
            }

            callback(null, foundPost)
        })
    })
}