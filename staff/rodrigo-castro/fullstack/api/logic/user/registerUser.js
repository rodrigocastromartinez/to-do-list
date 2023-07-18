const {
    validators: { validateEmail, validatePassword, validateUserName },
    errors: { DuplicityError }
} = require('com')
const { User } = require('../../data/models')

/**
 * 
 * @param {string} name user's name
 * @param {string} email user's email
 * @param {string} password user's password
 * @returns Promise
 */

module.exports = (name, email, password) => {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            await User.create({ name, email, password, savedPosts: [] })
        } catch(error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        }
    })()
}