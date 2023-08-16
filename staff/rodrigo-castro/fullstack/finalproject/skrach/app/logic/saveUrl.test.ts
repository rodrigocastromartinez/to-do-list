import mongoose from 'mongoose'
import { User, Project, Track } from '../data/models'
import saveAudio from './saveAudio'
import dotenv from 'dotenv'
import saveUrl from './saveUrl'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test-project')
        await Promise.all([User.deleteMany(), Project.deleteMany(), Track.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const project = await Project.create({name: 'example', owners: [user.id]})
        const track = new Track({project: project.id})
        project.tracks.push(track)
        await project.save()
        await saveUrl(user.id, project.id, track.id, 'www.prueba.com/trackid.ogg')
        await project.save()
        console.log(project)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()