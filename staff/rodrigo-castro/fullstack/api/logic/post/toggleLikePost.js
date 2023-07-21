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

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const post = await Post.findById(postId)

        if (!post) throw new ExistenceError(`post with id ${postId} not found`)

        const index = post.likedBy.findIndex(id => id.toString() === userId)

        if (index < 0)
            post.likedBy.push(userId)
        else {
            post.likedBy.splice(index, 1)
        }

        await Post.updateOne({ _id: postId }, { $set: { likedBy: post.likedBy } })
    })()
}
