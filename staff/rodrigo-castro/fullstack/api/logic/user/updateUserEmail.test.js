const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const updateUserEmail = require('./updateUserEmail')

;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123', avatar: 'http://www.image.com/avatar.jpg' })
        await updateUserEmail(user.id, 'pepe@grillo.com', 'grillo@pepe.com', '123123123')
        const updatedUser = await User.findById(user.id)
        console.log(updatedUser.email)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()