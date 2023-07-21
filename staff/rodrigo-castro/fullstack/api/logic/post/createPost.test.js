const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const createPost = require('./createPost')

;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        await createPost(user.id, 'http://www.image.com/post.jpeg', 'my post')
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()