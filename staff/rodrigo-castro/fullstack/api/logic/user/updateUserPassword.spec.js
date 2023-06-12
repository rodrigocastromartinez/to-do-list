require('dotenv').config()

const updateUserPassword = require('./updateUserPassword')
const { expect } = require('chai')
const { readFile, writeFile } = require('fs')

describe('updateUserPassword', () => {
    let id, name, email, password, newPassword, newPasswordConfirm, avatar
    beforeEach(done => {
        id = `id-${Math.round(Math.random() * 100 + 1)}`
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        avatar = `avatar-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', (error) => {
            done(error)
        })
    })

    it('succeeds on changing the user password for the given one', done => {
        newPassword = password + 'new'
        newPasswordConfirm = newPassword

        const users = [{ id, name, email, password, avatar }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
            expect(error).to.be.null

            updateUserPassword(id, password, newPassword, newPasswordConfirm, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user = users.find(user => user.id === id)

                    expect(user).to.exist
                    expect(user.password).to.equal(newPassword)

                    done()
                })
            })
        })
    })

    it('fails on non-existing user', done => {
        newPassword = password + 'new'
        newPasswordConfirm = newPassword

        updateUserPassword(id, password, newPassword, newPasswordConfirm, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${id} not found`)

            done()
        })
    })

    it('fails when new password equals current password', () => {
        newPassword = password
        newPasswordConfirm = newPassword + 'new'

        expect(() => updateUserPassword(id, password, newPassword, newPasswordConfirm, () => { })).to.throw(Error, 'New password must be different as previous password')
    })

    after(done => {
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', (error) => {
            done(error)
        })
    })
})