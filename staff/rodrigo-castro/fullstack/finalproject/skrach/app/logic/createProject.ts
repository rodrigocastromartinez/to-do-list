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

export default function createProject (userId: string, name: string, owners: Owners) {
    validateId(userId)
    validateText(name)

    
    return (async () => {
        const user = await User.findById(userId).lean()
        
        if (!user) throw new Error(`user with id ${userId} not found`)
        
        const _owners = await Promise.all(owners.map(async function(owner) {
            const _owner = await User.findOne({ email: owner })

            if(!_owner){
                throw new Error(`user with email ${owner} not found`)
            }
            
            return _owner.id
        }))

        console.log(_owners)
        
        await Project.create({
            name,
            owners:_owners
        })
    })()
}