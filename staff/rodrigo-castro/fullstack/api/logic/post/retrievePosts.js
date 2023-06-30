const { ObjectId } = require('mongodb')
const context = require('../context')

module.exports = userId => {

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return users.find().toArray()
                .then(users => {
                    return posts.find().toArray()
                        .then(posts => {
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