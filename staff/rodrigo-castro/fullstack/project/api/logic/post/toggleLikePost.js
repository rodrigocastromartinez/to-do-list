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

                    const index = post.likedBy.findIndex(id => id.toString() === userId)

                    if (index < 0)
                        post.likedBy.push(userId)
                    else {
                        post.likedBy.splice(index, 1)
                    }

                    return Post.updateOne({ _id: postId }, { $set: { likedBy: post.likedBy } })
                })
        })
}
