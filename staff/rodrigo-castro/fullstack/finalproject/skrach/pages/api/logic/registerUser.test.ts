const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const registerUser = require('./registerUser')

;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        await registerUser('mon.goose2', 'mong2@goose.com', '123123123')
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()

export{} // QUE TAN CHAPUZA ES ESTO ????