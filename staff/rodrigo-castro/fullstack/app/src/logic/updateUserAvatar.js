// import { validateId, validateUrl } from "./helpers/validators"
import { saveUser, findUserById } from '../data'
import { validators } from 'com'

const { validateId, validateUrl } = validators

export const updateUserAvatar = (userId, avatarUrl, callback) => {
    validateId(userId, 'user id')
    validateUrl(avatarUrl, 'Avatar url')

    findUserById(userId, (foundUser) => {
        if (!foundUser) {
            alert(new Error('Something went wrong. User not found', { cause: "ownError" }))

            return
        }

        foundUser.avatar = avatarUrl

        saveUser(foundUser, () => callback(null))
    })
}