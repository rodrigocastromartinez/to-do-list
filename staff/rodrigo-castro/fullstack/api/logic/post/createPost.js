const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl, validateText } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = (userId, image, text, callback) => {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            const post = {
                author: userId,
                image,
                text,
                date: new Date,
                likedBy: [],
                privacy: 'public'
            }

            return posts.insertOne(post)
        })
}