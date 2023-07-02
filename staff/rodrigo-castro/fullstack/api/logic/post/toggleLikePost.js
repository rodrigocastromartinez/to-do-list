const { validators: { validateId } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

/**
 * 
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @returns Promise<>
 */

module.exports = (userId, postId) => {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context



    const userObjectId = new ObjectId(userId)

    return users.findOne({ _id: userObjectId })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error(`post with id ${postId} not found`)

                    const index = post.likedBy.findIndex(id => id.toString() === userId)

                    if (index < 0)
                        post.likedBy.push(userObjectId)
                    else {
                        post.likedBy.splice(index, 1)
                    }

                    return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likedBy: post.likedBy } })
                })
        })
}
