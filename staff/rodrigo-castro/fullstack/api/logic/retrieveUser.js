const { readFile } = require('fs')
const { validators: { validateId } } = require('com')

module.exports = (userId, callback) => {
    validateId(userId)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const foundUser = users.find(user => user.id === userId)

        if (!foundUser) {
            callback(new Error(`user with user id ${userId}not found`))

            return
        }

        const user = {
            id: foundUser.id,
            name: foundUser.name
        }

        if (foundUser.avatar)
            user.avatar = foundUser.avatar

        if (foundUser.city)
            user.city = foundUser.city

        callback(null, user)
    })
}