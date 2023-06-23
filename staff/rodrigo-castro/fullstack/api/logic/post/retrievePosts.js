const { readFile } = require('fs')
const { validators: { validateId } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = (userId) => {

    validateId(userId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return posts.find().forEach(post => {
                return users.findOne({ _id: post.author })
                    .then(author => {
                        post.author = {
                            authorId: author.id,
                            name: author.name,
                            avatar: author.avatar
                        }

                        user.savedPosts.includes(post.id)
                            .then(includes => post.isFav = includes)
                    })
            })
        })

    // readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, usersJson) => {


    //     posts.forEach(post => {
    //         const author = users.find(user => user.id === post.author)

    //         post.author = {
    //             authorId: author.id,
    //             name: author.name,
    //             avatar: author.avatar
    //         }

    //         post.isFav = user.savedPosts.includes(post.id)
    //     })

    //     const reversedPosts = []

    //     for (let i = posts.length - 1; i >= 0; i--) {
    //         reversedPosts.push(posts[i])
    //     }

    //     callback(null, reversedPosts)
    // })
}