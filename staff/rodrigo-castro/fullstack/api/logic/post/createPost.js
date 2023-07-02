const { validators: { validateId, validateUrl, validateText } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

/**
 * 
 * @param {string} userId user's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>} 
 */

module.exports = (userId, image, text) => {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            const post = {
                author: new ObjectId(userId),
                image,
                text,
                date: new Date,
                likedBy: [],
                privacy: 'public'
            }

            return posts.insertOne(post)
        })
}