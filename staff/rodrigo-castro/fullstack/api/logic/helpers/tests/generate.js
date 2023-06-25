const { ObjectId } = require('mongodb')

module.exports = {
    user: () => ({
        _id: new ObjectId(),
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
        likedPosts: []
    }),

    post: userId => ({
        _id: new ObjectId(),
        author: userId,
        image: `image-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date,
        likes: []
    })
}