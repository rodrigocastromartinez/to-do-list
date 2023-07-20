const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const updateUserAvatar = require('./updateUserAvatar')

// mongoose.connect('mongodb://127.0.0.1:27017/data-test')
//     .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
//     .then(() => User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123', avatar: 'http://www.image.com/avatar.jpg' }))
//     .then(user => updateUserAvatar(user.id, 'http://www.new-image/new-avatar.jpg'))
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => mongoose.disconnect())
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123', avatar: 'http://www.image.com/avatar.jpg' })
        await updateUserAvatar(user.id, 'http://www.new-image/new-avatar.jpg')
        const updatedUser = await User.findById(user.id)
        console.log(updatedUser.avatar)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()