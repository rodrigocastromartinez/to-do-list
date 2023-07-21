const {
    validators: { validateId, validateUrl, validateText },
    errors: { AuthorizationError }
} = require('com')
const { User, Post } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>}
 */

module.exports = (userId, postId, image, text) => {
    validateId(userId)
    validateId(postId)
    validateUrl(image)
    validateText(text)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const post = await Post.findById(postId)

        if (!post) throw new ExistenceError(`post with id ${postId} not found`)

        if (post.author.toString() !== userId) throw new AuthorizationError(`post with id ${postId} does not belong to user with id ${userId}`)

        await Post.updateOne({ _id: postId }, { $set: { image, text } })
    })()
}