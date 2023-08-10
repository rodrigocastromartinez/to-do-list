import mongoose from 'mongoose'
import { User, Project, Track } from '../data/models'
import createTrack from './createTrack'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test-project')
        await Promise.all([User.deleteMany(), Project.deleteMany(), Track.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const project = await Project.create({name: 'example', owners: [user.id]})
        const track = await createTrack(user.id, project.id)
        console.log(track)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()