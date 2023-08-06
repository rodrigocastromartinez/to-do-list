import { User, Project } from '../data/models'
import { validators, errors } from '../../com'

const { validateId } = validators
const ExistenceError = errors

/**
 * 
 * @param {string} userId user's id
 * @param {string} projectId project's id
 * @returns {Promise<object>} The project
 */

export default function retrieveProject(userId: string, projectId: string) {
    validateId(userId)
    validateId(projectId)

    return (async () => {
        const [user, project] = await Promise.all([
            User.findById(userId).lean(),
            Project.findById(projectId).lean()
        ])

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        if (!project) throw new ExistenceError(`project with id ${projectId} not found`)

        return project
    })()
}