const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const authenticateUser = require('./authenticateUser')

// mongoose.connect('mongodb://127.0.0.1:27017/data-test')
//     .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
//     .then(() => User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' }))
//     .then(() => authenticateUser('pepe@grillo.com', '123123123'))
//     .then(console.log)
//     .catch(error => console.error(error))
//     .finally(() => mongoose.disconnect())
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const userId = await authenticateUser('pepe@grillo.com', '123123123')
        console.log(userId)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()