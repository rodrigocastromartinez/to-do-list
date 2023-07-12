const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const retrievePost = require('./retrievePost')

mongoose.connect('mongodb://127.0.0.1:27017/data-project-test')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([
        User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' }),
        Post.create({ image: 'http://www.image.com/post.jpeg', text: 'my post' }) // TERMINAR !!!!
    ]))
    .then(([user, post]) => retrievePost(user.id, post.id))
    .then(console.log)
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())