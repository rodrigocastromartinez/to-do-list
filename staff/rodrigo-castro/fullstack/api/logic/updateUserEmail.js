const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateEmail, validatePassword } } = require('com')

module.exports = (userId, userPreviousEmail, userNewEmail, userPassword, callback) => {
    validateId(userId)
    validateEmail(userPreviousEmail)
    validateEmail(userNewEmail)
    validatePassword(userPassword)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.email === userNewEmail)

        if (user) {
            callback(new Error('new email is already registered'))

            return
        }

        user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with user-id ${userId} not found`))

            return
        }

        if (user.email !== userPreviousEmail || user.password !== userPassword) {
            callback(new Error(`email or password incorrect`))

            return
        }

        user.email = userNewEmail

        json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}