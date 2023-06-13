require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser.js')

describe('registerUser', () => {
    let name, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
    })

    it('succeeds on new user', done => {
        registerUser(name, email, password, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
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

    it('succeeds on other non-existing user', done => {
        const idCount = Math.round(Math.random() * 100 + 1)
        const id2 = `user-${idCount}`
        const name2 = `name-${Math.random()}`
        const email2 = `e-${Math.random()}@mail.com`
        const password2 = `password-${Math.random()}`

        const users = [{ id: id2, name: name2, email: email2, password: password2 }]
        const json = JSON.stringify(users)

        writeFile(`./${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            registerUser(name, email, password, error => {
                expect(error).to.be.null

                readFile(`./${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null

                    const usersJson = JSON.parse(json)

                    const user = usersJson.find(user => user.email === email)

                    expect(user).to.exist
                    expect(user.id).to.equal(`user-${idCount + 1}`)
                    expect(user.name).to.equal(name)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                    expect(user.avatar).to.be.undefined
                    expect(user.savedPosts).to.have.lengthOf(0)

                    done()
                })
            })
        })
    })

    it('fails on existing user', done => {
        const user = [{ name, email, password }]
        const json = JSON.stringify(user)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            registerUser(name, email, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${email} already exists`)

                done()
            })
        })
    })

    it('fails on empty name', () => {
        expect(() => registerUser('', email, password, () => { })).to.throw(Error, 'Name is empty')
    })

    it('fails on empty email', () => {
        expect(() => registerUser(name, '', password, () => { })).to.throw(Error, 'Email is empty')
    })

    it('fails on empty password', () => {
        expect(() => registerUser(name, email, '', () => { })).to.throw(Error, 'password must have at least 8 characters')
    })

    after(done => writeFile('./data/posts.json', '[]', error => done(error)))
})

