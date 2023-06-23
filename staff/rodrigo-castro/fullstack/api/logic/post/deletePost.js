const { readFile, writeFile } = require('fs')
const { validators: { validateId } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId, callback) => {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error(`post with id ${postId} not found`)

                    if (post.author !== user._id.toString(`post with id ${postId} does not belong to user with id ${userId}`)) throw new Error()

                    return posts.deleteOne({ _id: new ObjectId(postId) })
                })
        })
}