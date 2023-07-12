const mongoose = require('mongoose')

const { User, Post } = require('./models')

mongoose.connect('mongodb://127.0.0.1:27017/data')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => {
        const user = new User({ name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123' })
        const post = new Post({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })

        post.author = user.id

        return Promise.all([user.save(), post.save()])
    })
    .then(([user, post]) => {

    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => mongoose.disconnect())