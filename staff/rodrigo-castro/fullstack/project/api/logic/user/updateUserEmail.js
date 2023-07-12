const {
    validators: { validateId, validateEmail, validatePassword },
    errors: { DuplicityError }
} = require('com')
const { User } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @param {string} userPreviousEmail user's previous email
 * @param {string} userNewEmail user's new email
 * @param {string} userPassword user's password
 * @returns Promise<>
 */

module.exports = (userId, userPreviousEmail, userNewEmail, userPassword) => {
    validateId(userId)
    validateEmail(userPreviousEmail)
    validateEmail(userNewEmail)
    validatePassword(userPassword)

    if (userPreviousEmail === userNewEmail) throw new Error('new email must be different than previous')

    return User.findOne({ email: userNewEmail })
        .then(user => {
            if (user) throw new DuplicityError('new email is already registered')

            return User.findById(userId).lean()
                .then(user => {
                    if (!user) throw new ExistenceError('user not found')

                    if (user.email !== userPreviousEmail || user.password !== userPassword) throw new AuthError(`email or password incorrect`)

                    return User.updateOne({ _id: userId }, { $set: { email: userNewEmail } })
                })
        })
}