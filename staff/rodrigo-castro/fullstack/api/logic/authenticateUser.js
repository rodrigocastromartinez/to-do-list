const { readFile } = require('fs')
const { validators: { validateEmail, validatePassword } } = require('com')

module.exports = function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.email === email)

        if (user === undefined || user.password !== password) {
            callback(new Error('Wrong email or password'))

            return
        }

        callback(null, user.id)
    })
}