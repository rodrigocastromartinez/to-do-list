// import { validateId, validateText } from "./helpers/validators"
import { saveUser, findUserById } from '../data'
import { validators } from 'com'

const { validateId, validateText } = validators

export const updateUserCity = (userId, city, callback) => {
    validateId(userId, 'user id')
    validateText(city, 'city')

    findUserById(userId, (foundUser) => {
        if (!foundUser) {
            alert(new Error('Something went wrong. User not found', { cause: "ownError" }))

            return
        }

        foundUser.city = city

        saveUser(foundUser, () => callback(null))
    })
}