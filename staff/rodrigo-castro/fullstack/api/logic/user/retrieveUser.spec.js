require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const retrieveUser = require('./retrieveUser.js')

describe('retrieveUser', () => {
    let id, name, email, password

    beforeEach(done => {
        id = `id-${Math.round(Math.random() * 1000)}`
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
    })

    it('succeeds on existing user', done => {
        const user = [{ id, name, email, password }]
        const json = JSON.stringify(user)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            retrieveUser(id, (error, user) => {
                expect(error).to.be.null
                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)

                done()
            })
        })
    })

    it('fails on non-existing user', done => {
        retrieveUser(id, (error, user) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with user id ${id}not found`)
            expect(user).to.be.undefined

            done()
        })
    })

    after(done => writeFile('./data/posts.json', '[]', error => done(error)))
})

