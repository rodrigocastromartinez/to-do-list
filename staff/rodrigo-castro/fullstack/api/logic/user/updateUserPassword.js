const {
    validators: { validateId, validatePassword },
    errors: { ContentError, ExistenceError, AuthError }
} = require('com')
const { User } = require('../../data/models')

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

    if (previousPassword === newPassword) throw new ContentError('New password must be different as previous password')

    if (newPassword !== newPasswordRepeated) throw new ContentError('Passwords do not match')

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        if (user.password !== previousPassword) throw new AuthError('password is incorrect')

        await User.updateOne({ _id: userId }, { $set: { password: newPassword } })
    })()
}