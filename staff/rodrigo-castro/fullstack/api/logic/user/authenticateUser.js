const {
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com')
const { User } = require('../../data/models')

/**
 * 
 * @param {string} email user's email
 * @param {string} password user's password
 * @returns {Promise<string>} user's id
 */

module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (password !== user.password) throw new AuthError('wrong credentials')

            return user.id
        })
}