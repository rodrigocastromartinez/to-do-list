const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @returns {Promise<object>} all posts
 */

module.exports = userId => {
    validateId(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Post.find().sort('date').populate('author', '-password -savedPosts -__v').lean()
    ])
        .then(([user, posts]) => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)

            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                post.isFav = user.savedPosts.some(fav => fav.toString() === post.id)

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }
            })

            return posts
        })
}