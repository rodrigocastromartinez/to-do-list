const { validators: { validateId, validateEmail, validatePassword } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = (userId, userPreviousEmail, userNewEmail, userPassword) => {
    validateId(userId)
    validateEmail(userPreviousEmail)
    validateEmail(userNewEmail)
    validatePassword(userPassword)

    if (userPreviousEmail === userNewEmail) throw new Error('new email must be different than previous')

    const { users } = context

    return users.findOne({ email: userNewEmail })
        .then(user => {
            if (user) throw new Error('new email is already registered')

            return users.findOne({ _id: new ObjectId(userId) })
                .then(user => {
                    if (!user) throw new Error('user not found')

                    if (user.email !== userPreviousEmail || user.password !== userPassword) throw new Error(`email or password incorrect`)

                    return users.updateOne({ _id: new ObjectId(userId) }, { $set: { email: userNewEmail } })
                })
        })
}