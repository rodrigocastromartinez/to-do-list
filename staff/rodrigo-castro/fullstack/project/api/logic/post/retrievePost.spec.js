require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')
const retrievePost = require('./retrievePost.js')

describe('retrievePost', () => {
    let userId, postId, name, email, password, image, text

    beforeEach(done => {
        userId = `user-${Math.random()}`
        name = `name-${Math.random()}`
        email = `user-${Math.random()}@email.com`
        password = `pass-${Math.random()}`
        postId = `post-${Math.random()}`
        image = `www.image.com/${Math.random()}`
        text = `text-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', () => {
            writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error))
        })
    })

    it('succeeds on existing user', done => {
        const user = [{ id: userId, name, email, password }]
        const json = JSON.stringify(user)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            const posts = [{ id: postId, image, text }]
            const postsJson = JSON.stringify(posts)

            writeFile(`${process.env.DB_PATH}/posts.json`, postsJson, error => {
                expect(error).to.be.null

                retrievePost(userId, postId, (error, post) => {
                    expect(error).to.be.null
                    expect(post.id).to.equal(postId)
                    expect(post.image).to.equal(image)
                    expect(post.text).to.equal(text)

                    done()
                })
            })
        })
    })

    it('fails on non-existing user', done => {
        retrievePost(userId, postId, (error, user) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${userId} not found`)
            expect(user).to.be.undefined

            done()
        })
    })

    it('fails on non-existing post', done => {
        const user = [{ id: userId, name, email, password }]
        const json = JSON.stringify(user)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            retrievePost(userId, postId, (error, user) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`post with id ${postId} not found`)
                expect(user).to.be.undefined

                done()
            })
        })
    })


    after(done => writeFile(`${process.env.DB_PATH}/posts.json`, '[]', error => done(error)))
})