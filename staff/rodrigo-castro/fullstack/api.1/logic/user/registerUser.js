const { validators: { validateEmail, validatePassword, validateUserName } } = require('com')
const context = require('../context')

module.exports = (name, email, password) => {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.insertOne({ name, email, password })
}