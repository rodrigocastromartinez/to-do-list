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

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId}, not found`)

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error(`post with id ${postId} not found`)

                    if (post.author.toString() !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

                    if (post.privacy === 'public') {
                        post.privacy = 'privated'
                    } else {
                        post.privacy = 'public'
                    }

                    return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { privacy: post.privacy } })
                })
        })
}