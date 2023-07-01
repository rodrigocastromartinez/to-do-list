const {
    validators: { validateEmail, validatePassword, validateUserName },
    errors: DuplicityError
} = require('com')
const context = require('../context')

module.exports = (name, email, password) => {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.insertOne({ name, email, password, savedPosts: [] })
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        })
}