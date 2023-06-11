const { readFile, writeFile } = require('fs')
const retrievePosts = require('./retrievePosts')
const { expect } = require('chai')

describe('retrievePosts', () => {
    let userId, postId, name, avatar

    beforeEach(done => {
        userId = `user-${Math.random()}`
        postId = `post-${Math.random()}`
        name = `name-${Math.random()}`
        avatar = `www.avatar.com/${Math.random()}`

        writeFile('./data/users.json', '[]', () => {
            writeFile('./data/posts.json', '[]', error => done(error))
        })
    })

    it('retrieves reversed posts on existing user', done => {
        const users = [{ id: userId, name, avatar, savedPosts: [] }]
        const usersJson = JSON.stringify(users)

        writeFile('./data/users.json', usersJson, error => {
            expect(error).to.be.null

            const secondPostId = postId + '-2'
            const thirdPostId = postId + '-3'

            const posts = [{ id: postId, author: userId }, { id: secondPostId, author: userId }, { id: thirdPostId, author: userId }]
            const postsJson = JSON.stringify(posts)

            writeFile('./data/posts.json', postsJson, error => {
                expect(error).to.be.null

                retrievePosts(userId, (error, reversedPosts) => {
                    expect(error).to.be.null

                    readFile('./data/posts.json', (error, json) => {
                        expect(error).to.be.null

                        const retrievedPosts = JSON.parse(json)

                        expect(retrievedPosts[0].id).to.equal(reversedPosts[2].id)
                        expect(retrievedPosts[1].id).to.equal(reversedPosts[1].id)
                        expect(retrievedPosts[2].id).to.equal(reversedPosts[0].id)

                        done()
                    })
                })
            })
        })
    })
})

