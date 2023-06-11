const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl } } = require('com')

module.exports = (userId, avatarUrl, callback) => {
    validateId(userId)
    validateUrl(avatarUrl)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        user.avatar = avatarUrl

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