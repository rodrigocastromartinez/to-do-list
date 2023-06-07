const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePassword } } = require('com')

module.exports = function updateUserPassword(userId, previousPassword, newPassword, newPasswordRepeated, callback) {
    validateId(userId)
    validatePassword(previousPassword)
    validatePassword(newPassword)
    validatePassword(newPasswordRepeated)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        if (user.password !== previousPassword) {
            callback(new Error(`Password is incorrect`))

            return
        }

        if (previousPassword === newPassword) {
            callback(new Error(`New password must be different as previous password`))

            return
        }

        if (newPassword !== newPasswordRepeated) {
            callback(new Error(`Passwords do not match`))
        }

        user.password = newPassword

        json = JSON.stringify(users)

        writeFile('.data/users.json', json, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}