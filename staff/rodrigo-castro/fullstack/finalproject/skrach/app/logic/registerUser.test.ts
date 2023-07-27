import mongoose from 'mongoose'
import { User, Post } from '../data/models'
import registerUser from './registerUser'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test-project')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        console.log('hello world')
        await registerUser('mon.goose2', 'mong2@goose.com', '123123123')
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()