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

                    const index = post.likedBy.indexOf(userId)

                    if (index < 0)
                        post.likedBy.push(userId)
                    else {
                        post.likedBy.splice(index, 1)
                    }

                    return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likedBy: post.likedBy } })
                })
        })
}