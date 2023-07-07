const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @returns Promise<>
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

                    const index = user.savedPosts.indexOf(postId)

                    if (index < 0)
                        user.savedPosts.push(postId)
                    else {
                        user.savedPosts.splice(index, 1)
                    }

                    return User.updateOne({ _id: userId }, { $set: { savedPosts: user.savedPosts } })
                })
        })
}