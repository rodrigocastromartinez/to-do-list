console.debug('load register user')

// import { validateUserName, validateEmail, validatePassword } from "./helpers/validators"
import { saveUsers, loadUsers, findUser } from "../data"
import { validators } from 'com'

const { validateUserName, validateEmail, validatePassword } = validators

export const registerUserFull = (userEmail, userName, userPassword, callback) => {
    validateUserName(userName)

    validateEmail(userEmail)

    validatePassword(userPassword)

    findUser(userEmail, foundUser => {
        if (foundUser) {
            callback(new Error('user already exists'))

            return
        }

        let id = 'user-1'

        loadUsers(users => {

            const lastUser = users[users.length - 1]

            if (lastUser)
                id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

            users.push({
                id,
                name: userName,
                email: userEmail,
                password: userPassword,
                savedPosts: []
            })

            saveUsers(users, () => callback(null))
        })
    })

}