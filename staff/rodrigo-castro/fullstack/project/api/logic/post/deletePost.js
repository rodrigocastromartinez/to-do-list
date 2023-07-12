const {
    validators: { validateId },
    errors: { ExistenceError, AuthorizationError }
} = require('com')
const { User, Post } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @returns {Promise<>}
 */

module.exports = (userId, postId) => {
    validateId(userId)
    validateId(postId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            return Post.findById(postId)
                .then(post => {
                    if (!post) throw new ExistenceError(`post with id ${postId} not found`)

                    if (post.author.toString() !== userId) throw new AuthorizationError(`post with id ${postId} does not belong to user with id ${userId}`)

                    return Post.deleteOne({ _id: postId })
                })
        })
}