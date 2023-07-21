const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const deletePost = require('./deletePost.js')

;(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const post = await Post.create({ image: 'http://www.image.com/post.jpeg', text: 'my post', author: user.id })
        await deletePost(user.id, post.id)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()