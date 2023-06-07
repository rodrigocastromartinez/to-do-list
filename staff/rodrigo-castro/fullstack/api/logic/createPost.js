const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl, validateText } } = require('com')

module.exports = function createPost(userId, image, text, callback) {
    validateId(userId)
    validateUrl(image)
    validateText(text)

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

            let id = 'post-1'

            const lastPost = posts[posts.length - 1]

            if (lastPost)
                id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

            const post = {
                id,
                author: userId,
                image,
                text,
                date: new Date,
                likedBy: [],
                privacy: 'public'
            }

            posts.push(post)

            postsJson = JSON.stringify(posts)

            writeFile('./data/posts.json', postsJson, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}