const {
    validators: { validateId },
    errors: { ExistenceError, AuthorizationError }
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

        if (!user) throw new ExistenceError(`user with id ${userId}, not found`)

        const post = await Post.findById(postId)

        if (!post) throw new ExistenceError(`post with id ${postId} not found`)

        if (post.author.toString() !== userId) throw new AuthorizationError(`post with id ${postId} does not belong to user with id ${userId}`)

        if (post.privacy === 'public') {
            post.privacy = 'privated'
        } else {
            post.privacy = 'public'
        }

        await Post.updateOne({ _id: postId }, { $set: { privacy: post.privacy } })
    })()
}