require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const retrievePosts = require('./retrievePosts.js')

describe('retrievePosts', () => {
    let userId, postId, name, email, password, avatar

    beforeEach(done => {
        userId = `user-${Math.random()}`
        name = `name-${Math.random()}`
        email = `user-${Math.random()}@email.com`
        password = `pass-${Math.random()}`
        avatar = `www.image.com/${Math.random()}`
        postCount = Math.round(Math.random() * 1000)
        postId = `post-${postCount}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', () => {
            writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error))
        })
    })

    it('succeeds on existing user', done => {
        const user = [{ id: userId, name, email, password, savedPosts: [] }]
        const json = JSON.stringify(user)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            const posts = [{ id: postId, author: userId }, { id: `post-${postCount + 1}`, author: userId }, { id: `post-${postCount + 2}`, author: userId }]
            const postsJson = JSON.stringify(posts)

            writeFile(`${process.env.DB_PATH}/posts.json`, postsJson, error => {
                expect(error).to.be.null
                debugger
                retrievePosts(userId, (error, posts) => {
                    expect(error).to.be.null
                    expect(posts[0].id).to.equal(`post-${postCount + 2}`)
                    expect(posts[1].id).to.equal(`post-${postCount + 1}`)
                    expect(posts[2].id).to.equal(postId)

                    done()
                })
            })
        })
    })

    it('fails on non-existing user', done => {
        retrievePosts(userId, (error, user) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${userId} not found`)
            expect(user).to.be.undefined

            done()
        })
    })

    after(done => writeFile(`${process.env.DB_PATH}/posts.json`, '[]', error => done(error)))
})