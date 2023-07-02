const { validators: { validateId, validatePassword } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

/**
 * 
 * @param {string} userId user's id
 * @param {string} previousPassword user's previous password
 * @param {string} newPassword user's new password
 * @param {string} newPasswordRepeated user's new password confirmation
 * @returns Promise<>
 */

module.exports = (userId, previousPassword, newPassword, newPasswordRepeated) => {
    validateId(userId)
    validatePassword(previousPassword)
    validatePassword(newPassword)
    validatePassword(newPasswordRepeated)

    if (previousPassword === newPassword) throw new Error('New password must be different as previous password')

    if (newPassword !== newPasswordRepeated) throw new Error('Passwords do not match')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            if (user.password !== previousPassword) throw new Error('password is incorrect')

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { password: newPassword } })
        })
}