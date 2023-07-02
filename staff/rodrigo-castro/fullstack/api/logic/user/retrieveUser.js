const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

/**
 * 
 * @param {string} userId user's id
 * @returns {Promise<object>} User found
 */

module.exports = userId => {
    validateId(userId)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            delete user._id
            delete user.password

            return user
        })
}