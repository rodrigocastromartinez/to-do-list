const { readFile, writeFile } = require('fs')
const { validators: { validateEmail, validatePassword, validateUserName } } = require('com')

module.exports = function registerUser(name, email, password, callback) {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    readFile('./data/users.json', 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.email === email)

        if (user) {
            callback(new Error(`user with email ${email} already exists`))

            return
        }

        let id = 'user-1'

        const lastUser = users[users.length - 1]

        if (lastUser)
            id = `user-${parseInt(lastUser.id.slice(5)) + 1}`

        users.push({
            id,
            name,
            email,
            password,
            savedPosts: []
        })

        json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}