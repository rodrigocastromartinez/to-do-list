const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const createPost = require('./createPost')

describe('createPost', () => {
    let id, image, text

    beforeEach(done => {
        id = `user-${Math.random()}`
        image = `www.image.com/${Math.random()}`
        text = `text-${Math.random()}`

        writeFile('./data/users.json', '[]', () => {
            writeFile('./data/posts.json', '[]', error => done(error))
        })
    })

    it('succeeds on an existing id and non-empty inputs', done => {
        const user = [{ id }]
        const json = JSON.stringify(user)

        writeFile('./data/users.json', json, error => {
            expect(error).to.be.null

            createPost(id, image, text, error => {
                expect(error).to.be.null

                readFile('./data/posts.json', (error, json) => {
                    expect(error).to.be.null

                    const posts = JSON.parse(json)

                    const post = posts.find(post => post.author === id)

                    expect(post.image).to.equal(image)
                    expect(post.text).to.equal(text)
                    expect(post.author).to.equal(id)

                    done()
                })
            })
        })
    })

    it('fails on a non-existing user', done => {
        createPost(id, image, text, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${id} not found`)

            done()
        })
    })

    after(done => writeFile('./data/users.json', '[]', error => done(error)))
})