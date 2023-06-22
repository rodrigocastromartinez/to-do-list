const { validators: { validateId } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = userId => {
    validateId(userId)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            delete user._id
            delete user.password

            return user
        })
}