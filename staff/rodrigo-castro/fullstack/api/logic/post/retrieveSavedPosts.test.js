const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const retrieveSavedPosts = require('./retrieveSavedPosts')

;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const post1 = await Post.create({ image: 'http://www.image.com/post.jpeg', text: 'my post', author: user.id })
        const post2 = await Post.create({ image: 'http://www.image2.com/post2.jpeg', text: 'my post2', author: user.id })
        const user2 = await User.create({ name: 'pepe.grillo2', email: 'pepe2@grillo.com', password: '123123123', savedPosts: post2.id })
        const posts = await retrieveSavedPosts(user2.id)
        console.log(posts)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()