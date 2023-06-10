const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserAvatar = require('./updateUserAvatar')

describe('updateUserAvatar', () => {
    let id, url

    beforeEach(done => {
        id = `user-${Math.random()}`
        url = `www.avatar.com/${Math.random()}`

        writeFile('./data/users.json', '[]', error => done(error))
    })

    it('succeeds on existing user', done => {
        const users = [{ id, url }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
            expect(error).to.be.null

            const newAvatar = url + '-new'

            updateUserAvatar(id, newAvatar, error => {
                expect(error).to.be.null

                readFile('./data/users.json', (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user = users.find(user => user.id === id)

                    expect(user).to.exist
                    expect(user.avatar).to.equal(newAvatar)

                    done()
                })
            })
        })
    })

    it('fails on non-existing user', done => {
        updateUserAvatar(id, url, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${id} not found`)

            done()
        })
    })

    it('fails on an emtpy url', () => {
        expect(() => updateUserAvatar(id, '', () => { })).to.throw(Error, 'url is empty')
    })

    it('fails on an emtpy id', () => {
        expect(() => updateUserAvatar('', url, () => { })).to.throw(Error, 'id is empty')
    })
})