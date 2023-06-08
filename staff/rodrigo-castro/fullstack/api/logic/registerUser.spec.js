const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser.js')

describe('registerUser', () => {
    beforeEach(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

    it('should succeed on new user', done => {
        const name = `name-${Math.random()}`
        const email = `e-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        registerUser(name, email, password, error => {
            expect(error).to.be.null

            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.be.undefined
                expect(user.savedPosts).to.have.lengthOf(0)

                done()
            })
        })
    })

    it('should fail on existing user', done => {
        const name = `name-${Math.random()}`
        const email = `e-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        const user = [{ name, email, password }]
        const json = JSON.stringify(user)

        writeFile('./data/users.json', json, error => {
            expect(error).to.be.null

            registerUser(name, email, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${email} already exists`)

                done()
            })
        })
    })

    after(done => writeFile('./data/users.json', '[]', error => done(error)))
})

