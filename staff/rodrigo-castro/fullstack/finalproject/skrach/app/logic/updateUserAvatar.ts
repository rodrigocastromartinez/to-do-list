import { User } from '../data/models'
import { validators, errors } from '../../com'

const { validateId, validateUrl } = validators
const { ExistenceError } = errors

/**
 * 
 * @param {string} userId user's id
 * @param {string} avatarUrl user's avatar url
 * @returns Promise<>
 */

export default function updateUserAvatar (userId: string, avatarUrl: string) {
    validateId(userId)
    validateUrl(avatarUrl)

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        return User.updateOne({ _id: userId }, { $set: { avatar: avatarUrl } })
    })()
}