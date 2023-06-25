require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./registerUser.js')
const { cleanUp, populate, generate } = require('../helpers/tests')
const context = require('../context')
const { MongoClient } = require('mongodb')

describe('registerUser', () => {
    let client

    before(() => {
        client = new MongoClient(process.env.MONGODB_URL)

        return client.connect()
            .then(connection => {
                const db = connection.db()

                context.users = db.collection('users')
                context.posts = db.collection('posts')
            })
    })

    let user

    beforeEach(() => {
        user = generate.user()

        return cleanUp()
    })

    it('succeeds on new user', () => {
        registerUser(user.name, user.email, user.password)
            .then(() => {
                return context.users.findOne({ email: user.email })
            })
            .then(user2 => {
                expect(user2).to.exist
                expect(user2._id.toString()).to.equal(user._id.toString())
                expect(user2.name).to.equal(user.name)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                expect(user2.avatar).to.be.undefined
                expect(user2.savedPosts).to.have.lengthOf(0)
            })
    })


    it('succeeds on a second non-existing user', () => {
        const user2 = generate.user()
        const users = [user2]

        return populate(users, [])
            .then(() => {
                registerUser(user.name, user.email, user.password)
                    .then(() => context.users.findOne({ email }))
                    .then(user2 => {
                        expect(user2).to.exist
                        expect(user2._id.toString()).to.equal(user._id.toString())
                        expect(user2.name).to.equal(user.name)
                        expect(user2.email).to.equal(user.email)
                        expect(user2.password).to.equal(user.password)
                        expect(user2.avatar).to.be.undefined
                        expect(user2.savedPosts).to.have.lengthOf(0)
                    })
            })
    })

    it('fails on existing user', () => {
        const users = [user]

        return populate(users, [])
            .then(() => registerUser(user.name, user.email, user.password))
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${user.email} already exists`)
            })
    })

    it('fails on empty name', () => {
        expect(() => registerUser('', user.email, user.password, () => { })).to.throw(Error, 'Name is empty')
    })

    it('fails on empty email', () => {
        expect(() => registerUser(user.name, '', user.password, () => { })).to.throw(Error, 'Email is empty')
    })

    it('fails on empty password', () => {
        expect(() => registerUser(user.name, user.email, '', () => { })).to.throw(Error, 'password must have at least 8 characters')
    })

    after(() => cleanUp().then(() => client.close()))
})