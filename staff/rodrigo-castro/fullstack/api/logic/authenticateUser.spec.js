const { expect } = require('chai')
const { writeFile } = require('fs')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {
    let name, email, password

    beforeEach(done => {
        id = `${Math.random()}`
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })

    it('succeeds on an existing user', done => {
        const users = [{ id, name, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
            expect(error).to.be.null

            authenticateUser(email, password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(id)

                done()
            })
        })
    })

    it('fails on a non-existing user', done => {
        const users = [{ id, name, email, password }]
        const json = JSON.stringify(users)

        authenticateUser(email, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('Wrong email or password')
            expect(userId).to.be.undefined

            done()
        })
    })

    it('fails on an existing user but wrong password', done => {
        const users = [{ id, name, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
            expect(error).to.be.null

            authenticateUser(email, password + '-wrong', (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('Wrong email or password')
                expect(userId).to.be.undefined

                done()
            })
        })
    })

    after(done => writeFile('./data/users.json', '[]', error => done(error)))
})

