const { readFile } = require('fs')
const { validators: { validateId } } = require('com')

module.exports = (userId, callback) => {
    validateId(userId)

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

            posts.forEach(post => {
                const author = users.find(user => user.id === post.author)

                post.author = {
                    authorId: author.id,
                    name: author.name,
                    avatar: author.avatar
                }

                post.isFav = user.savedPosts.includes(post.id)
            })

            const reversedPosts = []

            for (let i = posts.length - 1; i >= 0; i--) {
                reversedPosts.push(posts[i])
            }

            callback(null, reversedPosts)
        })
    })
}