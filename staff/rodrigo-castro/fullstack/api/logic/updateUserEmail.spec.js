require('dotenv').config()

const { readFile, writeFile } = require('fs')
const updateUserEmail = require('./updateUserEmail')
const { expect } = require('chai')

describe('updateUserEmail', () => {
    let id, email

    beforeEach(done => {
        id = `user-${Math.random()}`
        email = `user-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
    })

    it('succeeds on existing user and correct inputs', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            const newEmail = email + '.es'

            updateUserEmail(id, email, newEmail, password, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user = users.find(user => user.id === id)

                    expect(user).to.exist
                    expect(user.email).to.equal(newEmail)

                    done()
                })
            })
        })
    })

    it('fails on non-existing user', done => {
        const newEmail = email + '.es'

        updateUserEmail(id, email, newEmail, password, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with user-id ${id} not found`)

            done()
        })
    })

    it('fails if new email is already registered', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            const newEmail = email

            updateUserEmail(id, email, newEmail, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('new email is already registered')

                done()
            })
        })
    })

    it('fails on wrong password', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            const newEmail = email + '.es'
            wrongPassword = `password-${Math.random()}`

            updateUserEmail(id, email, newEmail, wrongPassword, error => {
                expect(error).to.be.instanceOf(Error)

                done()
            })
        })
    })

    it('fails on an emtpy email', () => {
        const newEmail = email + '.es'

        expect(() => updateUserEmail(id, '', newEmail, password, () => { })).to.throw(Error, 'Email is empty')
    })

    it('fails on an emtpy id', () => {
        const newEmail = email + '.es'

        expect(() => updateUserEmail('', email, newEmail, password, () => { })).to.throw(Error, 'id is empty')
    })
})