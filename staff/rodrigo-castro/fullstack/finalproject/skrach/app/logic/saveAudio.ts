import { validateId } from "../../com"
import { User, Project } from '../data/models'
import { firebase } from '../firebase'

/**
 * 
 * @param {string} userId user's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>} 
 */

export default function saveAudio (userId: string, projectId: string, trackId: string, file: Blob) {
    validateId(userId)
    validateId(projectId)
    validateId(trackId)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        const track = await User.findById(trackId)
        
        if (!track) throw new Error(`track with id ${trackId} not found`)

        const { ref } = await firebase.storage().ref().child(`tracks/64d4e8c7ad2k4e0e1k40a8de.ogg`).put(file) // HACER DINAMICA

        const url = await ref.getDownloadURL()

        return url
    })()
}