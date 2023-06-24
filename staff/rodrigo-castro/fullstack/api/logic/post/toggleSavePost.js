const { validators: { validateId } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId) => {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error(`post with id ${postId} not found`)

                    const index = user.savedPosts.indexOf(postId)

                    if (index < 0)
                        user.savedPosts.push(postId)
                    else {
                        user.savedPosts.splice(index, 1)
                    }

                    return users.updateOne({ _id: new ObjectId(userId) }, { $set: { savedPosts: user.savedPosts } })
                })
        })
}