const { readFile, writeFile } = require('fs')

module.exports = function toggleSavePost(userId, postId, callback) {
    //TODO validate inputs

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

            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            const index = user.savedPosts.indexOf(postId)

            if (index < 0)
                user.savedPosts.push(postId)
            else {
                user.savedPosts.splice(index, 1)
            }

            usersJson = JSON.stringify(users)

            writeFile('./data/posts.json', usersJson, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}