const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const retrieveUser = require('./retrieveUser')

// mongoose.connect('mongodb://127.0.0.1:27017/data-test')
//     .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
//     .then(() => User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' }))
//     .then(user => retrieveUser(user.id))
//     .then(console.log)
//     .catch(error => console.error(error))
//     .finally(() => mongoose.disconnect())
;
(async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        const userCreated = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const user = await retrieveUser(userCreated.id)
        console.log(user)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()