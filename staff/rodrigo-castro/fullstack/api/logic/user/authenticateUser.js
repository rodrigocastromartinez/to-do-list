const { validators: { validateEmail, validatePassword } } = require('com')
const context = require('../context')

module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.findOne({ email })
        .then(user => {
            if (!user) throw new Error('user not found')

            if (password !== user.password) throw new Error('wrong credentials')

            return user._id.toString()
        })
}