const {
    validators: { validateId, validateUrl },
    errors: { ExistenceError }
} = require('com')
const { User } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @param {string} avatarUrl user's avatar url
 * @returns Promise<>
 */

module.exports = (userId, avatarUrl) => {
    validateId(userId)
    validateUrl(avatarUrl)

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            return User.updateOne({ _id: userId }, { $set: { avatar: avatarUrl } })
        })
}