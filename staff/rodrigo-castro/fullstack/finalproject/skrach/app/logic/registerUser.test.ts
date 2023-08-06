import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import registerUser from './registerUser'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test-project')
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        console.log('hello world')
        await registerUser('mon.goose2', 'mong2@goose.com', '123123123')
        const user = await User.findOne({email: "mong2@goose.com"})
        console.log(user)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()