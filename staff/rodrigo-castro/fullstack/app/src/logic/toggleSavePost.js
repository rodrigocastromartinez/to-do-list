// import { validateId } from './helpers/validators'
import { saveUser, findPostById, findUserById } from "../data"
import { validators } from 'com'

const { validateId } = validators

export default (userId, postId, callback) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User id ${userId} not found`))
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`Post id ${postId} not found`))
            }

            const index = user.savedPosts.indexOf(postId)

            if (index < 0)
                user.savedPosts.push(postId)
            else {
                user.savedPosts.splice(index, 1)
            }

            saveUser(user, () => callback(null))
        })
    })
}