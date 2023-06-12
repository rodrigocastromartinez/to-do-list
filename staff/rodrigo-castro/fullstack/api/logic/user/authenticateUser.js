const { readFile } = require('fs')
const { validators: { validateEmail, validatePassword } } = require('com')

module.exports = (email, password, callback) => {
    validateEmail(email)
    validatePassword(password)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
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