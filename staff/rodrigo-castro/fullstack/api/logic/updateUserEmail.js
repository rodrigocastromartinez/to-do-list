const { readFile, writeFile } = require('fs')

module.exports = function updateUserEmail(userId, userPreviousEmail, userNewEmail, userPassword, callback) {
    // TODO validate inputs

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.email === userNewEmail)

        if(user) {
            callback(new Error('new email is already registered'))

            return
        }

        user = users.find(user => user.id === userId)

        if(!user){
            callback(new Error(`user with user-id ${userId} not found`))

            return
        }

        if(user.email !== userPreviousEmail || user.password !== userPassword) {
            callback(new Error(`email or password incorrect`))
        }

        user.email = userNewEmail

        json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
            if(error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}