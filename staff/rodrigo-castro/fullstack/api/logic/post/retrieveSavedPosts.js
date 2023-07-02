const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

/**
 * 
 * @param {string} userId user's id
 * @returns {Promise<object>} Saved posts
 */

module.exports = userId => {
    validateId(userId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)

            return users.find().toArray()
                .then(users => {
                    return posts.find().toArray()
                        .then(_posts => {
                            const posts = _posts.filter(post => post.author.toString() === userId)
                            posts.forEach(post => {
                                post.id = post._id.toString()
                                delete post._id

                                const author = users.find(user => user._id.toString() === post.author.toString())

                                const { _id, name, avatar } = author

                                post.author = {
                                    id: _id.toString(),
                                    name,
                                    avatar
                                }

                                post.isFav = user.savedPosts.some(fav => fav.toString() === post.id)
                            })
                            return posts
                        })
                })
        })
}