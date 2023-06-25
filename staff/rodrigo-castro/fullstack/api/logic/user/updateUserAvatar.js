const { validators: { validateId, validateUrl } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = (userId, avatarUrl) => {
    validateId(userId)
    validateUrl(avatarUrl)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { avatar: avatarUrl } })
        })
}