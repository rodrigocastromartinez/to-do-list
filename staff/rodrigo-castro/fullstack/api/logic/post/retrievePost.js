const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

/**
 * 
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @returns {Promise<object>} The post
 */

module.exports = (userId, postId) => {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new ExistenceError(`post with id ${postId} not found`)

                    return post
                })
        })
}