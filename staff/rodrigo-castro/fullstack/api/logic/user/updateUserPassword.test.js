const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const updateUserPassword = require('./updateUserPassword')

;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123', avatar: 'http://www.image.com/avatar.jpg' })
        await updateUserPassword(user.id, '123123123', '234234234', '234234234')
        const updatedUser = await User.findById(user.id)
        console.log(updatedUser.password)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()