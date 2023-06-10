const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser.js')

// **** PARA CHEQUEAR LOS PORCENTAJES DE COBERTURA Y QUÉ PARTES DE LA FUNCIÓN FALTAN:
// **** EN TERMINAL: open coverage/index.html luego del test

describe('registerUser', () => {
    let name, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })

    it('succeeds on new user', done => {
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

    it('fails on existing user', done => {
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

