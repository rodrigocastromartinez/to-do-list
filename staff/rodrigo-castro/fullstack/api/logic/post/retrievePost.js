const { readFile } = require('fs')
const { validators: { validateId } } = require('com')

module.exports = (userId, postId, callback) => {
    validateId(userId)
    validateId(postId)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, usersJson) => {
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

            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            callback(null, post)
        })
    })
}