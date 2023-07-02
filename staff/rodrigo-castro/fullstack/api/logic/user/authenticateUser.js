const {
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com')
const context = require('../context')

/**
 * 
 * @param {string} email user's email
 * @param {string} password user's password
 * @returns {Promise<string>} user's id
 */

module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.findOne({ email })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (password !== user.password) throw new AuthError('wrong credentials')

            return user._id.toString()
        })
}