const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @returns {Promise<object>} User found
 */

module.exports = userId => {
    validateId(userId)

    return (async () => {
            const user = await User.findById(userId).lean()
    
            if (!user) throw new ExistenceError('user not found')
    
                delete user._id
                delete user.password
                delete user.savedPosts
                delete user.__v
    
                return user
    })()
}