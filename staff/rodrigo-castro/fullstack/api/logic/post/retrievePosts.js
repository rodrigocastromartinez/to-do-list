const { ObjectId } = require('mongodb')
const context = require('../context')

module.exports = function retrievePosts(userId) {

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return users.find().toArray()
                .then(users => {
                    return posts.find().toArray()
                        .then(posts => {
                            posts.forEach(post => {
                                post.favs = user.savedPosts.includes(post.id.toString())

                                const _user = users.find(user => user._id.toString() === post.author.toString())

                                post.author = {
                                    id: _user._id,
                                    username: _user.username,
                                    avatar: _user.avatar
                                }
                            })
                            return posts
                        })
                })
        })
}