import mongoose from 'mongoose'
import { User, Project, Track } from '../data/models'
import dotenv from 'dotenv'
import deleteTrack from './deleteTrack';

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test-project')
        await Promise.all([User.deleteMany(), Project.deleteMany(), Track.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const project = await Project.create({name: 'example', owners: [user.id]})
        const track = new Track({project: project.id, volume: 70, delay: 0})
        project.tracks.push(track)
        await project.save()
        await deleteTrack(user.id, project.id, track.id)
        const _project = await Project.findById(project.id)
        console.log(_project)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()