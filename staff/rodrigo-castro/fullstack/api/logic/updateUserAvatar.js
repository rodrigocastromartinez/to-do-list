const { readFile, writeFile } = require('fs')

module.exports = function updateUserAvatar(userId, avatarUrl, callback) {
    // TODO validate inputs

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.id === userId)

        if(!user){
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        user.avatar = avatarUrl

        json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
            if(error){
                callback(error)

                return
            }

            callback(null)
        })
    })
}