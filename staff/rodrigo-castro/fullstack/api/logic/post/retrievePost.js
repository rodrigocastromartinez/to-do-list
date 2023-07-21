const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @returns {Promise<object>} The post
 */

module.exports = (userId, postId) => {
    validateId(userId)
    validateId(postId)

    return (async () => {
        const [user, post] = await Promise.all([
            User.findById(userId).lean(),
            Post.findById(postId, '-_id -__v -likedBy -date -author').lean()
        ])

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        if (!post) throw new ExistenceError(`post with id ${postId} not found`)

        return post
    })()
}