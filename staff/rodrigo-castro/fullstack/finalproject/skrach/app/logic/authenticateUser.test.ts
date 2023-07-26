import mongoose from 'mongoose'
import { User, Post } from '../models/models'
import authenticateUser from './authenticateUser'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test-project')
        await Promise.all([User.deleteMany(), Post.deleteMany()])
        await User.create({ name: 'rodrigo', email: 'ro@drigo.com', password: '123123123', savedPosts: [] })
        const token = await authenticateUser('ro@drigo.com', '123123123')
        console.log(token)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()