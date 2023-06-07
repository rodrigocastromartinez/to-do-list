const { readFile, writeFile } = require('fs')

module.exports = function deletePost(userId, postId, callback) {
    //TODO validate inputs

    readFile('./data/users.json', 'utf8', (error, usersJson) => {
        if(error) {
            callback(error)

            return
        }

        const users = JSON.parse(usersJson)

        const user = users.find(user => user.id === userId)

        if(!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        readFile('./data/posts.json', 'utf8', (error, postsJson) => {
            if(error) {
                callback(error)

                return
            }

            const posts = JSON.parse(postsJson)

            const index = posts.findIndex(post => post.id === postId)

            if(index < 0) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            if(posts[index].author !== userId) {
                callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`))

                return
            }

            posts.splice(index, 1)

            postsJson = JSON.stringify(posts)

            writeFile('./data/posts.json', postsJson, error => {
                if(error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}