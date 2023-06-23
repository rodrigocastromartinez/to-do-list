const { validators: { validateId, validateUrl, validateText } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId, image, text) => {
    validateId(userId)
    validateId(postId)
    validateUrl(image)
    validateText(text)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error(`post with id ${postId} not found`)

                    if (post.author.toString() !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

                    return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { image, date: new Date, text } })
                })
        })
}