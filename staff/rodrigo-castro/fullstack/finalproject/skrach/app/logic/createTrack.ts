import { validateId } from "../../com"
import { User, Project, Track } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>} 
 */

export default function createTrack (userId: string, projectId: string) {
    validateId(userId)
    validateId(projectId)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        const track = await Track.create({
            project: projectId
        })

        project.tracks.push(track) // EL TRACK ME QUEDA EN DB.TRACKS Y EN DB.PROJECTS - ESTA OK?

        await project.save()

        return track
    })()
}