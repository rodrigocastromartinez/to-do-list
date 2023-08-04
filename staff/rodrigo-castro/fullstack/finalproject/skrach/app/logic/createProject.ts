import { validators } from "../../com"
import { User, Project } from '../data/models'

const { validateId, validateText } = validators
/**
 * 
 * @param {string} userId user's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>} 
 */

type Owners = string[]

export default function createProject (userId: string) {
    validateId(userId)
    
    return (async () => {
        const user = await User.findById(userId).lean()
        
        if (!user) throw new Error(`user with id ${userId} not found`)
        
        await Project.create({
            name: 'Untitled',
            owners:[userId]
        })
    })()
}