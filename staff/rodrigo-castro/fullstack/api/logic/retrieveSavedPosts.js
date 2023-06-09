const { readFile } = require('fs')
const { validators: { validateId } } = require('com')

module.exports = (userId, callback) => {
    validateId(userId)

    readFile('./data/users.json', 'utf8', (error, usersJson) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(usersJson)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        readFile('./data/posts.json', 'utf8', (error, postsJson) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(postsJson)

            callback(null, posts.filter(post => user.savedPosts.includes(post.id)).reverse())
        })
    })
}