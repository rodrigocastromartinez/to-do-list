const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const registerUser = require('./registerUser')

mongoose.connect('mongodb://127.0.0.1:27017/data-test')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => registerUser('mon.goose2', 'mong2@goose.com', '123123123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())